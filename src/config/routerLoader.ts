import { Express, Router } from 'express'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

interface RouteModule {
  default: Router
}

const loadRoutes = async (app: Express) => {
  const routesDir = join(process.cwd(), 'src', 'routes')

  try {
    const files = readdirSync(routesDir)

    await Promise.all(
      files.map(async file => {
        try {
          const routeName = file.replace('.ts', '')
          const routePath = join(routesDir, file)

          const module = await import(routePath) as RouteModule

          const basePath = routeName === 'index' ? '/' : `/${routeName}`
          app.use(basePath, module.default)
          console.log(`Route loaded => ${basePath}`)
        } catch (err) {
          console.error(`Error loading route ${file}`, err)
        }
      })
    )
  } catch (err) {
    console.error('Error reading routes directory:', err)
    throw err
  }
}

export default loadRoutes
