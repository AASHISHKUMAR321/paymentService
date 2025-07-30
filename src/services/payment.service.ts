import { db } from "../db/index";
import { payments } from "../db/schema";
import { createPaymentDTO } from "@/types/payments"
import { Queue } from "bullmq"
import Redis from "ioredis"

 export class PaymentService {
     private redis: Redis;
     private paymentQueue: Queue;

     constructor(redis: Redis, paymentQueue: Queue) {
         this.redis = redis;
         this.paymentQueue = paymentQueue;
     }

    async createPayment(data: createPaymentDTO) {

        try {
            const { userId, orderId, amount, currency = "INR", geteway = "razorpay" } = data

            const exits = await this.redis.get(`payment:order:${orderId}`);
            if (exits) return {error:"duplicate order"}

            await this.redis.set(`payment:order:${orderId}`, 'locked', 'EX', 600);
            // store into db 

            const payment = await db.insert(payments).values({
                userId: userId,
                orderId,
                amount:amount.toString(),
                currency,
                status:'init',
                paymentGateway: geteway,
            })
            await this.paymentQueue.add('process',{paymentId:payment[0].insertId})
            return payment[0]

        } catch (err) {
            return {'error' :err}

        }
    }

}

