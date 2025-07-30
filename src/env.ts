
import { configDotenv } from 'dotenv';
import {z} from 'zod'

configDotenv({path:'.env'})
const envSchema = z.object({
    NODE_ENV:z.enum(['development','production','test']).default('development'),
    PORT:z.string(),
    DB_URL:z.string().optional()
})

const env = envSchema.safeParse(process.env);
if(!env.success){
    console.log("invalid env variables")
    process.exit(1)
}

export const {NODE_ENV,PORT,DB_URL} = env.data


export default env.data






