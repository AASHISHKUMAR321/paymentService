import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, bigint, mysqlEnum, varchar, decimal, datetime, text, int, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const payments = mysqlTable("payments", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number" }),
	status: mysqlEnum(['init','pending','success','failed']).default('init'),
	orderId: varchar("order_id", { length: 200 }).notNull(),
	paymentGateway: mysqlEnum("payment_gateway", ['razorpay']).default('razorpay'),
	currency: varchar({ length: 200 }).default('INR'),
	getwayTnxId: varchar("getway_tnx_id", { length: 200 }),
	amount: decimal({ precision: 10, scale: 2 }),
	createAt: datetime({ mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
	updateAt: datetime({ mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
},
(table) => [
	primaryKey({ columns: [table.id], name: "payments_id"}),
	unique("order_id").on(table.orderId),
]);

export const reconcilicationLogs = mysqlTable("reconcilication_logs", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	orderId: bigint("order_id", { mode: "number" }).notNull(),
	dbStatus: varchar("db_status", { length: 200 }),
	getwayStatus: varchar("getway_status", { length: 200 }),
	resolved: tinyint().default(0),
	createdAt: datetime({ mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
	paymentId: bigint("payment_id", { mode: "number" }),
	missMatch: text("miss_match"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "reconcilication_logs_id"}),
	unique("order_id").on(table.orderId),
]);

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	username: varchar({ length: 200 }),
	email: varchar({ length: 200 }),
	password: varchar({ length: 200 }),
	createAt: datetime({ mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
	upatedAt: datetime({ mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
]);
