import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const users = mysqlTable("users", {
    id: int().autoincrement().notNull(),
    username: varchar({ length: 200 }),
    email: varchar({ length: 200 }),
    password: varchar({ length: 200 }),
    createAt: datetime({ mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`),
    upatedAt: datetime({ mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`),
},
    (table) => [
        primaryKey({ columns: [table.id], name: "users_id" }),
    ]);
