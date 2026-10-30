import { PostgresJsQueryResultHKT, drizzle } from "drizzle-orm/postgres-js"
import { ExtractTablesWithRelations } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";
import postgres from "postgres"

// const client = new SQL(process.env.DATABASE_URL!)
const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle({ client })

export type Db = typeof db

type Schema = Record<string, unknown>

export type Tx =
    | Db
    | PgTransaction<
        PostgresJsQueryResultHKT,
        Schema,
        ExtractTablesWithRelations<Schema>
    >;

export function isTransaction(tx: Tx): tx is PgTransaction<any, any, any> {
    return tx instanceof PgTransaction
}
