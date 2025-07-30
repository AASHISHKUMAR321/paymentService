
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema'
import { DB_URL } from "../env";


console.log("dburl", DB_URL)

const poolConnection = mysql.createPool(DB_URL as string);

export const db = drizzle({ client: poolConnection, schema ,mode: "default" });

