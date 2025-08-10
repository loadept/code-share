import { describe, it, expect } from 'vitest'
import { RoomModel } from '../../src/models'
import { UserConnected } from '../../src/types/socket'

describe('RoomModel', () => {
  it('should create a single instance of RoomModel', () => {
    const roomModelInstance1 = RoomModel.instance
    const roomModelInstance2 = RoomModel.instance
    const roomModelInstance3 = RoomModel.instance
    const roomModelInstance4 = RoomModel.instance

    expect(roomModelInstance1).toBe(roomModelInstance2)
    expect(roomModelInstance2).toBe(roomModelInstance3)
    expect(roomModelInstance3).toBe(roomModelInstance4)
  })

  it('should create a new room', () => {
    const roomModel = RoomModel.instance
    const roomId = 'test-room'

    const expectedRoom: UserConnected[] = [
      { socketId: 'socket1', userId: 'user1', username: 'User One' }
    ]

    roomModel.setUsers(roomId, { socketId: 'socket1', userId: 'user1', username: 'User One' })

    expect(roomModel.getUsers(roomId)).toEqual(expectedRoom)
  })

  it('should verify that the previous room element still exists', () => {
    const roomModel = RoomModel.instance
    const roomId = 'test-room'

    const expectedRoom: UserConnected[] = [
      { socketId: 'socket1', userId: 'user1', username: 'User One' }
    ]

    expect(roomModel.getUsers(roomId)).toEqual(expectedRoom)
  })

  it('should add a new user to an existing room', () => {
    const roomModel = RoomModel.instance
    const roomId = 'test-room'

    const newUser: UserConnected = { socketId: 'socket2', userId: 'user2', username: 'User Two' }
    roomModel.setUsers(roomId, newUser)

    const expectedRoom: UserConnected[] = [
      { socketId: 'socket1', userId: 'user1', username: 'User One' },
      { socketId: 'socket2', userId: 'user2', username: 'User Two' }
    ]

    expect(roomModel.getUsers(roomId)).toEqual(expectedRoom)
  })

  it('should delete a user from a room', () => {
    const roomModel = RoomModel.instance
    const roomId = 'test-room'
    const socketIdToDelete = 'socket1'

    const result = roomModel.deleteUser(roomId, socketIdToDelete)

    expect(result).toEqual({ room: true })
    expect(roomModel.getUsers(roomId)).toEqual([
      { socketId: 'socket2', userId: 'user2', username: 'User Two' }
    ])
  })

  it('should delete the room if no users are left', () => {
    const roomModel = RoomModel.instance
    const roomId = 'test-room'
    const socketIdToDelete = 'socket2'

    const result = roomModel.deleteUser(roomId, socketIdToDelete)

    expect(result).toEqual({ all: true })
    expect(roomModel.getUsers(roomId)).toEqual([])
  })
})
