import express , { Express ,Request,Response } from "express"
import cors  from 'cors'
import cookieParser from 'cookie-parser'
import { db } from "./db"

import createDebugRouter from "./routes/debug"
import { container } from "./container"
import debugRouter from "./routes/debug"
class Server{
    app:Express
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }
    private middlewares(){
        this.app.use(express.json())
        this.app.use(cors({origin:"*"}))
        this.app.use(cookieParser())
        // this.app.use((req,res,next)=>{
        //     console.log("logger",req)
        // })

    }

    private routes(){
        this.app.get('/', (req: Request, res: Response) => {
            res.send('this is a home route')
        })
        this.app.get('/health', (req: Request, res: Response) => {
                res.status(200).send("server is running")
        })
        this.app.get('/users', async (req, res) => {
            let data = await db.query.users.findMany()
            res.send({ "users": data })

        })
        this.app.post('/payment', async (req: Request, res: Response) => {
            try {
                const payment = await container.paymentService.createPayment(req.body)
                res.status(201).send({ payment })

            } catch (err) {
                console.log("Internal server error")
                res.status(500).send("Internal server error")
            }
        })
        this.app.use('/debug', debugRouter)

    }


}

export default  new Server().app