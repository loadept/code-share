
import { Server, Socket } from 'socket.io'

export class SocketCodeHandlers {
  handleCodeUpdate(_io: Server, socket: Socket, code: string) {
    const roomId = socket.data.roomId as string

    socket.broadcast.to(roomId).emit('codeUpdates', { code })
  }
}
