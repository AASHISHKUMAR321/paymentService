import { configDotenv } from 'dotenv';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
configDotenv({path:'.env'})

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DB_URL!,
    },
});
