import { Request, Response } from 'express'
import { join } from 'node:path'

export default class IndexController {
  indexPage(_: Request, res: Response) {
    const staticFiles = join(__dirname, '..', 'public', 'index.html')
    res.sendFile(staticFiles)
  }
}
