import './utils/logger'
import { PORT } from './config/environments'
import express, { Express, json } from 'express'
import { createServer, Server } from 'node:http'
import CreateSocket from './sockets/init'
import loadRoutes from './routes/loader'
import cors from 'cors'

class App {
  private app: Express
  private server: Server

  private socket: CreateSocket

  constructor() {
    this.app = express()
    this.server = createServer(this.app)
    this.socket = new CreateSocket(this.server)

    this.setupMiddleware()
    this.setupRoutes()
  }

  private setupMiddleware() {
    this.app.disable('x-powered-by')
    this.app.use(json())
    this.app.use(cors())
  }

  private setupRoutes() {
    loadRoutes(this.app)
  }

  public run() {
    this.server.listen(PORT, () => {
      this.socket.useMiddlewares()
      this.socket.initSocket()
      console.log(`server listen on ${PORT}`)
    })
  }
}

const app = new App()
app.run()
