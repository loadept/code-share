import { ExtendedError, Socket } from 'socket.io'

export const validateRoom = (socket: Socket, next: (err?: ExtendedError) => void) => {
  const { roomId } = socket.handshake.query

  if (typeof roomId !== 'string') {
    const err = new Error('Invalid room ID') as ExtendedError
    err.data = { detail: 'Room ID does not meet the requirements' }
    return next(err)
  }

  if (!roomId || roomId.length !== 32 || !/^[0-9]{32}$/i.test(roomId)) {
    const err = new Error('Invalid room ID') as ExtendedError
    err.data = { detail: 'Room ID does not meet the requirements' }
    return next(err)
  }

  socket.data.roomId = roomId
  next()
}
