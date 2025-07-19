import { Request, Response } from 'express'

export default class IndexController {
  static indexPage(_: Request, res: Response) {
    res.send('Hello world')
  }
}
