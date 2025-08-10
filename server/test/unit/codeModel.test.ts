import { describe, it, expect } from 'vitest'
import { CodeRoomModel } from '../../src/models'
import { Code } from '../../src/types/code'

describe('CodeModel', () => {
  it('should create a single instance of CodeRoomModel', () => {
    const codeModelInstence1 = CodeRoomModel.instance
    const codeModelInstence2 = CodeRoomModel.instance
    const codeModelInstence3 = CodeRoomModel.instance
    const codeModelInstence4 = CodeRoomModel.instance

    expect(codeModelInstence1).toBe(codeModelInstence2)
    expect(codeModelInstence2).toBe(codeModelInstence3)
    expect(codeModelInstence3).toBe(codeModelInstence4)
  })

  it('should create a new code room', () => {
    const codeModel = CodeRoomModel.instance
    const roomId = 'test-room'
    const code = 'console.log("Hello, World!");'
    const codeRoom: Code = {
      code,
      lastUpdate: new Date('2025-01-01 00:00:00').toISOString(),
    }
    codeModel.setCode(roomId, codeRoom)

    expect(codeModel.getCode(roomId)).toBe(codeRoom)
  })

  it('should verify that the previous codeRoom element still exists', () => {
    const codeModel = CodeRoomModel.instance
    const roomId = 'test-room'
    const codeRoom: Code = {
      code: 'console.log("Hello, World!");',
      lastUpdate: new Date('2025-01-01 00:00:00').toISOString(),
    }

    expect(codeModel.getCode(roomId)).toStrictEqual(codeRoom)
  })

  it('should update an existing code room', () => {
    const codeModel = CodeRoomModel.instance
    const roomId = 'test-room'
    const newCode = 'console.log("Updated Code!");'
    const updatedCodeRoom: Code = {
      code: newCode,
      lastUpdate: new Date('2025-01-02 00:00:00').toISOString(),
    }
    codeModel.setCode(roomId, updatedCodeRoom)

    expect(codeModel.getCode(roomId)).toBe(updatedCodeRoom)
  })

  it('should return undefined for a non-existent code room', () => {
    const codeModel = CodeRoomModel.instance
    const nonExistentRoomId = 'non-existent-room'

    expect(codeModel.getCode(nonExistentRoomId)).toBeUndefined()
  })

  it('should delete a code room', () => {
    const codeModel = CodeRoomModel.instance
    const roomId = 'test-room'

    codeModel.deleteCode(roomId)

    expect(codeModel.getCode(roomId)).toBeUndefined()
  })
})
