import { PaymentService } from "./services/payment.service"
import Redis from "ioredis"
import { Queue } from "bullmq"

const redis = new Redis()
const paymentQueue = new Queue('payment-queue')
const paymentService = new PaymentService(redis,paymentQueue)

export const container = {
    redis,
    paymentQueue,
    paymentService
}