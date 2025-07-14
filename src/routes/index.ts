import { Router } from 'express'
import { join } from 'node:path'

const router = Router()

router.get('/', (_req, res) => {
  const filePath = join(process.cwd(), 'src', 'views', 'index.html')
  res.sendFile(filePath)
})

export default router
