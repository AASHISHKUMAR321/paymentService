
export interface createPaymentDTO{

    userId:number,
    orderId:string,
    amount:number,
    status:boolean,
    currency?:string
    geteway?:'razorpay'
}