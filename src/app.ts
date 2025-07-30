import express , { Express ,Request,Response } from "express"
import cors  from 'cors'
import cookieParser from 'cookie-parser'
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
        this.app.use('/',(req:Request,res:Response)=>{
            res.send('this is a home route')
        })
        this.app.use('/health',(req:Request,res:Response)=>{
                res.status(200).send("server is running")
        })
    }


}

export default  new Server().app