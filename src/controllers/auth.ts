import { Request, Response } from 'express'
import { join } from 'node:path'
import { userValidation } from '../models/user'
import { v4 } from 'uuid'

export default class AuthController {
  static get(_: Request, res: Response) {
    const filePath = join(process.cwd(), "src", "ui", "views", "auth.html")

    res.sendFile(filePath)
  }

  static auth(req: Request, res: Response) {
    const result = userValidation(req.body || {})
    if (result.error) {
      return res.status(400).json({ detail: JSON.parse(result.error.message) })
    }

    const uuid = v4()
    const response = {
      userId: uuid,
      username: result.data.username
    }

    return res.json({ status: 'ok', data: response })
  }
}
