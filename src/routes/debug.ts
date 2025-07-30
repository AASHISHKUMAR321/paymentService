
import { Queue } from 'bullmq';
import { Router } from 'express'
import Redis from 'ioredis';



const createDebugRouter = (redis: Redis, paymentQueue:Queue) => {
    const debugRouter = Router()
    debugRouter.get('/redis', async (req, res) => {

        try {
            const keys = await redis.keys('payment:*');
            const values = await Promise.all(keys.map(async (key:string) => {
                const value = await redis.get(key)
                return { key, value }
            }))
            return res.json({ rediskey: values })
        } catch (err) {
            res.status(500).json({ error: 'redis debug is failed', details: err })
        }

    })
    debugRouter.get('/queue', async (req, res) => {

        try {
            const waiting = await paymentQueue.getWaiting()
            res.json({waiting:waiting.map((e:string)=>e)})
        } catch (err) {


        }
    })
    return debugRouter
}



export default createDebugRouter