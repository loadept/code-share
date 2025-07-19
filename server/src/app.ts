import { PORT } from './config/environments'
import express, { Express, json } from 'express'
import { createServer, Server } from 'node:http'
import CreateSocket from './sockets'
import loadRoutes from './routes/loader'

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
  }

  private setupRoutes() {
    loadRoutes(this.app)
  }

  public run() {
    this.server.listen(PORT, () => {
      this.socket.initSocket()
      console.log(`server listen on ${PORT}`)
    })
  }
}

const app = new App()
app.run()
