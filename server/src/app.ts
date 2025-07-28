import './utils/logger'
import getEnv from './config/environment'
import express, { Express, json } from 'express'
import { createServer, Server } from 'node:http'
import CreateSocket from './sockets/init'
import loadRoutes from './routes/loader'
import cors from 'cors'
import { join } from 'node:path'

class App {
  private PORT: string
  private app: Express
  private server: Server

  private socket: CreateSocket

  constructor() {
    this.PORT = getEnv('PORT')
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
    // Static files middleware
    this.app.use(express.static(join(__dirname, 'public')))
  }

  private setupRoutes() {
    loadRoutes(this.app)
  }

  public run() {
    this.server.listen(this.PORT, () => {
      this.socket.useMiddlewares()
      this.socket.initSocket()
      console.log(`server listen on ${this.PORT}`)
    })
  }
}

const app = new App()
app.run()
