import { Server, Socket } from "socket.io";

export class SocketHandlers {
  constructor() { }

  handleConnection(io: Server, socket: Socket, totalConnections: number) {
    io.emit('totalConnections', totalConnections)

    socket.on('codeUpdate', ({ code, userId }) => {
      socket.broadcast.emit('codeUpdate', {
        code,
        userId
      })
    })
  }
}
