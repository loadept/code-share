import { Request, Response } from 'express'
import { join } from 'node:path'

export default class IndexController {
  static indexPage(_: Request, res: Response) {
    const filePath = join(process.cwd(), "src", "ui", "views", "index.html")

    res.sendFile(filePath)
  }
}
