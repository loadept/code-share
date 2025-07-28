import { Router } from 'express'
import AuthController from '../controllers/auth'

const router = Router()
const authController = new AuthController()

router.post('/', authController.auth)

export default router
