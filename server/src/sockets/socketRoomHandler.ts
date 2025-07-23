import { Server, Socket } from 'socket.io'
import { UserConnected } from '../models/socket'

export class SocketRoomHandlers {
  public connectedUsers: Map<string, UserConnected[]>

  constructor() {
    this.connectedUsers = new Map<string, UserConnected[]>()
  }

  handleJoinRoom(io: Server, socket: Socket) {
    const roomId = socket.data.roomId as string
    const userData = socket.data.userData as UserConnected

    socket.join(roomId)
    console.log(`New socket connected ${socket.id} to room ${roomId}`)

    const roomUsers = this.connectedUsers.get(roomId) || []
    if (!roomUsers.some(u => u.userId === userData.userId)) {
      this.connectedUsers.set(roomId, [...roomUsers, userData])
    }

    this.emitRoomUpdate(io, socket)
  }

  handleLeaveRoom(io: Server, socket: Socket) {
    const roomId = socket.data.roomId as string
    const userData = socket.data.userData as UserConnected

    socket.leave(roomId)

    const roomUsers = this.connectedUsers.get(roomId)
      ?.filter(u => u.userId !== userData.userId) || []

    if (roomUsers.length > 0) {
      this.connectedUsers.set(roomId, roomUsers)
    } else {
      this.connectedUsers.delete(roomId)
    }

    this.emitRoomUpdate(io, socket)
  }

  handleDisconnect(io: Server, socket: Socket) {
    const roomId = socket.data.roomId as string
    const userData = socket.data.userData as UserConnected

    const roomUsers = this.connectedUsers.get(roomId)?.filter(u => u.userId !== userData.userId) || []

    if (roomUsers.length > 0) {
      this.connectedUsers.set(roomId, roomUsers)
    } else {
      this.connectedUsers.delete(roomId)
      console.log('Room completely eliminated')
    }

    this.emitRoomUpdate(io, socket)
  }

  emitRoomUpdate(io: Server, socket: Socket) {
    const roomId = socket.data.roomId as string

    const socketsCount = io.sockets.adapter.rooms.get(roomId)?.size || 0
    const users = this.connectedUsers.get(roomId) || []
    const userCount = users.length

    io.to(roomId).emit('roomUpdates', {
      roomId,
      users,
      count: userCount,
      sockets: socketsCount
    })
  }
}
