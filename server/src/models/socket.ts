import { User } from './user'

export interface UserConnected extends User {
  socketId: string
}