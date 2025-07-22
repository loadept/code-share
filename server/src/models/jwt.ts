import { JwtPayload } from 'jsonwebtoken'
import { User } from '../models/user'

export interface AuthPayload extends JwtPayload, User {}
