# Second Brain

## Getting started

### Backend

Run Postgres with Docker:

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

Create `backend/.env`:

```dotenv
DATABASE_URL=postgresql://user:password@localhost/sb_db
TZ=Asia/Seoul
```

Apply the schema directly, or generate and apply a migration:

```sh
# Apply immediately.
bun run db:push
# Generate migration file and apply.
bun run db:generate
bun run db:migrate
```

Run the backend:

```sh
bun run dev:backend
```

### Frontend

See the [frontend README](frontend/README.md) for development and component usage.
See the [Stitch references](docs/design/stitch/README.md) for design rules.

### Nix

Enter the development shell for Bun, Postgres, and language servers:

```sh
nix develop
# with your favorite shell:
nix develop -c zsh
# Pass `--experimental-features 'nix-command flakes'` if needed:
nix --experimental-features 'nix-command flakes' develop
```

Start local Postgres:

```sh
db-start
```

Check local Postgres status:

```sh
db-status
```

Run a Postgres client:

```sh
psql -h "127.0.0.1" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE"
# or use pgcli
pgcli -h "127.0.0.1" -p "$PGPORT" -u "$PGUSER" -d "$PGDATABASE"
```

The shell sets `DATABASE_URL` for local Postgres. Follow the [backend steps](#backend)
to install dependencies, apply the schema, and start the backend. Skip the Docker
command and `.env` setup.

Stop local Postgres:

```sh
db-stop
```
