import { Request, Response } from 'express'
import { join } from 'node:path'

export default class AuthController {
  static get(_: Request, res: Response) {
    const filePath = join(process.cwd(), "src", "ui", "views", "auth.html")

    res.sendFile(filePath)
  }

  static login(req: Request, res: Response) {
    if (!req.body) {
      return res.status(401).json({ detail: 'Username is expected' })
    }
    const { username } = req.body!
    if (username === undefined) {
      return res.status(401).json({ detail: 'Username is expected' })
    }

    return res.redirect('/')
    // return res.json({ message: `Welcome ${username}` })
  }
}
