# Second Brain

## Getting started

### Backend

Run Postgres in docker:
```sh
docker run -d -p 5432:5432 \
    -e POSTGRES_USER=user \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=sb_db \
    -e TZ=Asia/Seoul \
    -v ./pgdata:/var/lib/postgresql \
    --name sb-postgres \
    postgres:latest
```

Install dependencies:
```sh
bun install
```

Create `apps/backend/.env` file:
```
DATABASE_URL=postgresql://user:password@localhost/sb_db
TZ=Asia/Seoul
```

Create schemas in db:
```sh
# Apply immediately.
bun run db:push
# Generate migration file and apply.
bun run db:generate
bun run db:migrate
```

Run backend:
```sh
bun run dev:backend
```

### Nix

If you use nix package manager, just enter development shell to get Bun runtime, Postgres, and LSPs:
```sh
nix develop
# with your favorite shell:
nix develop -c zsh
# Pass `--experimental-features 'nix-command flakes'` if needed:
nix --experimental-features 'nix-command flakes' develop
```

Now you can use Bun, Postgres and its client, LSPs, and some useful scripts.

Start local Postgres:
```sh
db-start
```

Print local Postgres status:
```sh
db-status
```

Run Postgres client:
```sh
psql -h "127.0.0.1" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE"
# or use pgcli
pgcli -h "127.0.0.1" -p "$PGPORT" -u "$PGUSER" -d "$PGDATABASE"
```

Run Bun:
```sh
bun install
bun run db:push
bun run dev:backend
# ...
```

Stop local Postgres:
```sh
db-stop
```
