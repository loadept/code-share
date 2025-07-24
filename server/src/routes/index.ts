import { Router } from 'express'
import IndexController from '../controllers'

const router = Router()

router.get(/.*/, IndexController.indexPage)

export default router
