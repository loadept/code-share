import http from 'node:http'
import { Server } from "socket.io";
import { SocketHandlers } from "./socketHandler";

export default class CreateSocket {
  private _io: Server
  private sockerHandlers: SocketHandlers
  private totalConnections = 0

  constructor(httpServer: http.Server) {
    this._io = new Server(httpServer)
    this.sockerHandlers = new SocketHandlers()
  }

  initSocket() {
    this._io.on('connection', (socket) => {
      this.totalConnections++
      this.sockerHandlers.handleConnection(this._io, socket, this.totalConnections)

      socket.on('disconnect', () => {
        this.totalConnections--
        this._io.emit('totalConnections', this.totalConnections)
      })
    })
  }
}
