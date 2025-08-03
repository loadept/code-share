import { UserConnected } from '../types/socket'

class RoomModel {
  private static _instance: RoomModel = new RoomModel()
  private room:  Map<string, UserConnected[]>

  private constructor() {
    this.room = new Map<string, UserConnected[]>()
  }

  public getUsers(roomId: string) {
    return this.room.get(roomId) || []
  }

  public setUsers(roomId: string, user: UserConnected) {
    const prevUsers = this.getUsers(roomId)

    return this.room.set(roomId, [...prevUsers, user])
  }

  public deleteUser(roomId: string, socketId: string) {
    const usersInRoom = this.room.get(roomId)?.filter(u => u.socketId !== socketId) || []

    if (usersInRoom.length > 0) {
      this.room.set(roomId, usersInRoom)
      return { room: true }
    } else {
      console.log('Room completely eliminated')
      this.room.delete(roomId)
      return { all: true }
    }
  }

  public static get instance() {
    return this._instance
  }
}

export default RoomModel
