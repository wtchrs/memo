# Second Brain

## Getting started

### Backend

Run postgres in docker:
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
