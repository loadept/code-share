import { Server, Socket } from 'socket.io'
import { UserConnected } from '../types/socket'
import { RoomModel, CodeRoomModel } from '../models'

export class SocketRoomHandlers {
  public connectedUsers: Map<string, UserConnected[]>
  private roomModel: RoomModel
  private codeModel: CodeRoomModel

  constructor(roomModel: RoomModel, codeModel: CodeRoomModel) {
    this.connectedUsers = new Map<string, UserConnected[]>()
    this.roomModel = roomModel
    this.codeModel = codeModel
  }

  handleJoinRoom(io: Server, socket: Socket) {
    const roomId = socket.data.roomId as string
    const userData = socket.data.userData as UserConnected

    socket.join(roomId)
    console.log(`New socket connected ${socket.id} to room ${roomId}`)

    const roomUsers = this.roomModel.getUsers(roomId)

    if (roomUsers.length === 0) {
      userData.isLeader = true
    }
    if (!roomUsers.some(u => u.socketId === userData.socketId)) {
      this.roomModel.setUsers(roomId, userData)
    }

    this.emitRoomUpdate(io, socket)
    this.syncState(io, socket)
  }

  handleLeaveRoom(io: Server, socket: Socket) {
    const roomId = socket.data.roomId as string
    const userData = socket.data.userData as UserConnected

    socket.leave(roomId)

    if (this.roomModel.deleteUser(roomId, userData.socketId).all) {
      this.codeModel.deleteCode(roomId)
    }

    this.emitRoomUpdate(io, socket)
  }

  handleDisconnect(io: Server, socket: Socket) {
    const roomId = socket.data.roomId as string
    const userData = socket.data.userData as UserConnected

    if (this.roomModel.deleteUser(roomId, userData.socketId).all) {
      this.codeModel.deleteCode(roomId)
    }

    this.emitRoomUpdate(io, socket)
  }

  emitRoomUpdate(io: Server, socket: Socket) {
    const roomId = socket.data.roomId as string

    const socketsCount = io.sockets.adapter.rooms.get(roomId)?.size || 0
    const users = this.roomModel.getUsers(roomId)
    const userCount = users.length

    io.to(roomId).emit('roomUpdates', {
      roomId,
      users,
      count: userCount,
      sockets: socketsCount
    })
  }

  syncState(io: Server, socket: Socket) {
    const roomId = socket.data.roomId as string
    const code = this.codeModel.getCode(roomId)

    io.to(socket.id).emit('syncState', code)
  }
}
