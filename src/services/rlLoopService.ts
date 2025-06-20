import type { OpenAIClient } from "../llms/openaiClient.js"
import { saveHistory } from "../utils/fileLogger.js"
import { RLRecord } from "../types/index.js"

export class RLLoopService {
  constructor(
    private llm: OpenAIClient,
    private maxCycles = 3,
    private minScore = 80
  ) { }

  async run(task: string): Promise<RLRecord> {
    const history = []
    let best: RLRecord = { prompt: "", output: "", score: -1 }

    for (let cycle = 0; cycle < this.maxCycles; cycle++) {
      const prompts = await this.llm.generatePrompts(task)
      const outputs = await Promise.all(prompts.map((output) => this.llm.generateOutput(output)))
      const scores = await this.llm.batchCriticScores(task, outputs)
      console.log(prompts)

      for (let i = 0; i < prompts.length; i++) {
        const rec: RLRecord = {
          prompt: prompts[i],
          output: outputs[i],
          score: scores[i],
        }
        history.push(rec)
        if (rec.score > best.score) best = rec
      }

      const cycleBest = history.slice(-prompts.length).find((r) => r.score >= this.minScore)
      if (cycleBest) {
        await saveHistory(history)
        return cycleBest
      }
    }

    await saveHistory(history)
    return best
  }
}
