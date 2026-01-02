import { BunSQLQueryResultHKT, drizzle } from "drizzle-orm/bun-sql"
import { SQL } from "bun";
import { ExtractTablesWithRelations } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";

const client = new SQL(process.env.DATABASE_URL!)
export const db = drizzle(client)

type Schema = Record<string, unknown>

export type Tx =
    | typeof db
    | PgTransaction<
        BunSQLQueryResultHKT,
        Schema,
        ExtractTablesWithRelations<Schema>
    >;

export function isTransaction(tx: Tx): tx is PgTransaction<any, any, any> {
    return tx instanceof PgTransaction
}
