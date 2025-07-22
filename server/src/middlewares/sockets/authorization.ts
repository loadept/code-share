import { ExtendedError, Socket } from 'socket.io'
import { authJwt } from '../../config/authJwt'
import { UserConnected } from '../../models/socket';

export const authorization = (socket: Socket, next: (err?: ExtendedError) => void) => {
  const { token } = socket.handshake.auth;

  if (typeof token !== 'string') {
    const err = new Error('Invalid token') as ExtendedError
    err.data = { detail: 'The proportioned token is not valid' }
    return next(err) 
  }

  if (!token) {
    const err = new Error('Token was not provided') as ExtendedError
    err.data = { detail: 'A authorization token was not provided' }
    return next(err)
  }

  const payload = authJwt.verifyToken(token)
  if (!payload) {
    const err = new Error('Invalid token') as ExtendedError
    err.data = { detail: 'The proportioned token is not valid' }
    return next(err)
  }

  const userData: UserConnected = {
    ...payload,
    socketId: socket.id
  }
  socket.data.userData = userData
  next()
}
