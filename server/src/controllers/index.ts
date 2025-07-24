import { Request, Response } from 'express'
import { join } from 'node:path'

export default class IndexController {
  static indexPage(_: Request, res: Response) {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'))
  }
}
