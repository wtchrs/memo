{
  description = "Minimal Bun monorepo shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        dbUser = "sbuser";
        dbName = "sb_db";
        dbPort = "55432";

        dbStart = pkgs.writeShellApplication {
          name = "db-start";
          runtimeInputs = with pkgs; [ postgresql gnugrep ];
          text = ''
            data_dir="''${PGDATA:-$PWD/.postgres}"
            run_dir="''${PGHOST:-$data_dir/run}"
            port="''${PGPORT:-${dbPort}}"
            database="''${PGDATABASE:-${dbName}}"
            PGUSER="''${PGUSER:-${dbUser}}"
            user="$PGUSER"

            if [ ! -f "$data_dir/PG_VERSION" ]; then
              if [ "$run_dir" = "$data_dir/run" ]; then
                rmdir "$run_dir" 2>/dev/null || true
              fi
              initdb -D "$data_dir" --auth=trust --encoding=UTF8 --no-locale
            fi

            mkdir -p "$run_dir"

            if pg_ctl -D "$data_dir" status >/dev/null 2>&1; then
              echo "postgres is already running"
            else
              pg_ctl -D "$data_dir" \
                -l "$data_dir/postgres.log" \
                -o "-c listen_addresses=127.0.0.1 -p $port -k $run_dir" \
                -w -t 60 start
            fi

            # create user
            if ! psql -h "$run_dir" -p "$port" -d postgres -tAc "select 1 from pg_roles where rolname = '$user'" | grep -qx 1; then
              createuser -h "$run_dir" -p "$port" --superuser "$user"
            fi

            # create database
            if ! psql -h "$run_dir" -p "$port" -d postgres -tAc "select 1 from pg_database where datname = '$database'" | grep -qx 1; then
              createdb -h "$run_dir" -p "$port" -O "$user" "$database"
            fi

            echo "DATABASE_URL=postgresql://$user@127.0.0.1:$port/$database"
            echo "Next: bun run db:push"
          '';
        };

        dbStop = pkgs.writeShellApplication {
          name = "db-stop";
          runtimeInputs = with pkgs; [ postgresql ];
          text = ''
            data_dir="''${PGDATA:-$PWD/.postgres}"
            pg_ctl -D "$data_dir" -w -t 60 stop
          '';
        };

        dbStatus = pkgs.writeShellApplication {
          name = "db-status";
          runtimeInputs = with pkgs; [ postgresql ];
          text = ''
            data_dir="''${PGDATA:-$PWD/.postgres}"
            pg_ctl -D "$data_dir" status
          '';
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            # LSPs
            vtsls
            tailwindcss-language-server
            nil
            nixd
            statix

            bun
            pkg-config
            openssl

            # db
            postgresql
            pgcli

            # Scripts
            dbStart
            dbStop
            dbStatus
          ];

          shellHook = ''
            export PATH="$PWD/node_modules/.bin:$PATH"
            export PGDATA="$PWD/.postgres"
            export PGHOST="$PWD/.postgres/run"
            export PGPORT="${dbPort}"
            export PGDATABASE="${dbName}"
            export PGUSER="${dbUser}"
            export DATABASE_URL="postgresql://${dbUser}@127.0.0.1:${dbPort}/${dbName}"
            export TZ="Asia/Seoul"
            echo "bun: $(bun --version)"
            echo "postgres: $(postgres --version)"
          '';
        };
      });
}
