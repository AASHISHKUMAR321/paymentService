

import { container } from '../container';
import { Router } from 'express'



const debugRouter = Router()
debugRouter.get('/redis', async (req, res) => {

    try {
        const keys = await container.redis.keys('payment:*');
        const values = await Promise.all(keys.map(async (key: string) => {
            const value = await container.redis.get(key)
            return { key, value }
        }))
        return res.json({ rediskey: values })
    } catch (err) {
        res.status(500).json({ error: 'redis debug is failed', details: err })
    }

})
debugRouter.get('/queue', async (req, res) => {

    try {
        const waiting = await container.paymentQueue.getWaiting()
        res.json({ waiting: waiting.map((e: string) => e) })
    } catch (err) {


    }
})

export default debugRouter
