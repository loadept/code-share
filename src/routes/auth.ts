import { Router } from 'express'
import AuthController from '../controllers/auth'

const router = Router()

router.route('/')
  .get(AuthController.get)
  .post(AuthController.auth)

export default router
