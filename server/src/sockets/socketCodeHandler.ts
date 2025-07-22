
import { Server, Socket } from 'socket.io'
import { UserConnected } from '../models/socket'

export class SocketCodeHandlers {
  constructor() { }

  handleCodeUpdate(_io: Server, socket: Socket, code: string) {
    const roomId = socket.data.roomId as string
    const userData = socket.data.userData as UserConnected

    socket.broadcast.to(roomId).emit('codeUpdate', {
      code,
      userId: userData.userId
    })
  }
}
