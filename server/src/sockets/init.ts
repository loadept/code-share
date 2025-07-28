import http from 'node:http'
import { Server } from 'socket.io'
import { SocketRoomHandlers } from './socketRoomHandler'
import { SocketCodeHandlers } from './socketCodeHandler'
import { validateRoom } from '../middlewares/sockets/validateRoom'
import { authorization } from '../middlewares/sockets/authorization'

export default class CreateSocket {
  private _io: Server
  private socketRoomHandlers: SocketRoomHandlers
  private socketCodeHandlers: SocketCodeHandlers

  constructor(httpServer: http.Server) {
    this._io = new Server(httpServer, {
      transports: ['websocket'],
      connectionStateRecovery: {},
      cors: {
        origin: '*'
      }
    })
    this.socketRoomHandlers = new SocketRoomHandlers()
    this.socketCodeHandlers = new SocketCodeHandlers()
  }

  useMiddlewares() {
    this._io.use(authorization)
    this._io.use(validateRoom)
  }

  initSocket() {
    this._io.on('connection', (socket) => {
      // Peer connections socket
      socket.on('joinRoom', () => this.socketRoomHandlers.handleJoinRoom(this._io, socket))
      socket.on('leaveRoom', () => this.socketRoomHandlers.handleLeaveRoom(this._io, socket))

      // Code socket
      socket.on('codeUpdates', ({ code }) => this.socketCodeHandlers.handleCodeUpdate(this._io, socket, code))

      socket.on('disconnect', () => this.socketRoomHandlers.handleDisconnect(this._io, socket))
    })
  }
}
