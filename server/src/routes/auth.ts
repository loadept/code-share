import { Router } from 'express'
import AuthController from '../controllers/auth'

const router = Router()

router.post('', AuthController.auth)

export default router
