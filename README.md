# Second Brain

## Getting started

To run postgres in docker:
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

To install dependencies:
```sh
bun install
```

To create schemas in db:
```sh
# Apply immediately.
bunx --bun drizzle-kit push
# Generate migration file and apply.
bunx --bun drizzle-kit generate --name=init
bunx --bun drizzle-kit migrate
```

To run:
```sh
bun run dev
```

open http://localhost:3000
