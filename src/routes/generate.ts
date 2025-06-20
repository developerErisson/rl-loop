import { Router } from "express"
import { GenerateController } from "../controllers/generateController.js"

export function createGenerateRoute(controller: GenerateController) {
  const router = Router()

  router.post("/", controller.generate)
  
  return router
}
