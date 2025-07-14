import { PORT } from './config/environments'
import express, { static as staticFiles } from 'express'
import { createServer } from 'node:http'
import { join } from 'node:path'
import { Server } from 'socket.io'
import loadRoutes from './config/routerLoader'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.disable('x-powered-by')
app.use(express.json())
app.use(staticFiles(join(__dirname, 'public')))
loadRoutes(app)

io.on('connection', (socket) => {
  socket.on('code update', ({ code, userId }) => {
    socket.broadcast.emit('code update', {
      code,
      userId
    })
  })

  socket.on('disconnect', () => {
  })
})

server.listen(PORT, () => {
  console.log(`server listen on ${PORT}`)
})
