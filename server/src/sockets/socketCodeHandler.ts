
import { Server, Socket } from 'socket.io'
import { CodeRoomModel } from '../models'
import { Code } from '../types/code'

export class SocketCodeHandlers {
  private codeModel: CodeRoomModel

  constructor(codeModel: CodeRoomModel) {
    this.codeModel = codeModel
  }

  handleCodeUpdate(_io: Server, socket: Socket, code: string) {
    const roomId = socket.data.roomId as string
    const currDate = new Date()

    const codeContent: Code = {
      code: code,
      lastUpdate: currDate.toISOString()
    }
    this.codeModel.setCode(roomId, codeContent)
    socket.broadcast.to(roomId).emit('codeUpdates', { code })
  }
}
