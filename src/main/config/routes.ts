import { type Express, Router } from 'express'
import fastGlob from 'fast-glob'

export default function setUpRoutes (app: Express): void {
  const routesPath = __filename.endsWith('.js') ? '**/dist/main/routes/**-routes.js' : '**/src/main/routes/**-routes.ts'
  const router = Router()
  app.use('/transactions', router)
  fastGlob.sync(routesPath).map(async (file, _) => {
    const route = (await import(`../../../${file}`)).default
    route(router)
  })
}
