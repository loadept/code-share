import { JwtPayload } from 'jsonwebtoken'
import { User } from './user'

export interface AuthPayload extends JwtPayload, User {}
