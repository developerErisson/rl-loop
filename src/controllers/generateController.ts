import { Request, Response } from "express"
import { RLLoopService } from "../services/rlLoopService.js"

export class GenerateController {
  constructor(private rlLoop: RLLoopService) {}

  generate = async (req: Request, res: Response) => {
    const { task } = req.body
    if (!task) {
      return res.status(400).json({ error: "`task` é obrigatório" })
    }

    try {
      const result = await this.rlLoop.run(task)
      res.json(result)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Erro interno" })
    }
  }
}
