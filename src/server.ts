import { configDotenv } from "dotenv"
import app from "./app"
import { PORT } from "./env"


configDotenv()

class Server {

    private port: number | string

    constructor() {
        this.port = PORT || 9090
        this.start()
    }

    private start() {
        app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}

new Server()