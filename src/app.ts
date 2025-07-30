import express , { Express ,Request,Response } from "express"
import cors  from 'cors'
import cookieParser from 'cookie-parser'
import { db } from "./db"
import { users } from "./db/schema"
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
            console.log('data', data)
            res.send({ "users": data })

        })
    }


}

export default  new Server().app