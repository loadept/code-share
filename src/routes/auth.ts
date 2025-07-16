import { Router } from 'express'
import AuthController from '../controllers/auth'

const router = Router()

router.route('/')
  .get(AuthController.get)
  .post(AuthController.login)

export default router
