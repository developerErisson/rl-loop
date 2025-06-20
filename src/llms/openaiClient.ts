import OpenAI from "openai"

export class OpenAIClient {
  private client: OpenAI

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey })
  }

  async generatePrompts(task: string): Promise<string[]> {
    const systemPrompt = `
      voce e um engenheiro de prompts.
      Responda exatamente neste formato JSON (sem texto adicional):

      {"prompts":["variacao 1","variacao 2","variacao 3"]}
    `.trim()

    const { choices } = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `TAREFA: ${task}` }
      ]
    })

    const raw = choices[0]?.message?.content ?? ""
    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) throw new Error("resposta invalida")


    const { prompts } = JSON.parse(match[0])
    if (!Array.isArray(prompts) || prompts.length < 3) {
      throw new Error("formato inválido")
    }

    return prompts.slice(0, 3).map((s: string) => s.trim())
  }


  async generateOutput(prompt: string): Promise<string> {
    const { choices } = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }]
    })
    return choices[0]?.message?.content?.trim() ?? ""
  }

  async criticScore(task: string, output: string): Promise<number> {
    const { choices } = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      messages: [{
        role: "user",
        content: `
        de uma nota de 0 a 100 para este texto em relacao a tarefa.
        seja objetivo e direto. nao quero saber sobre o por que dessa nota
        retorne apenas o numero. sem decimais, sem texto adicional.
        
        TAREFA: ${task}
        TEXTO: ${output}`
      }]
    })

    const text = choices[0]?.message?.content ?? ""
    console.log(text)
    const regex = text.match(/\d{1,3}/)
    if (!regex) throw new Error("não retornou nota.")
      
    const score = parseInt(regex[0], 10)
    return Math.min(100, Math.max(0, score))
  }

  async batchCriticScores(task: string, outputs: string[]): Promise<number[]> {
    return Promise.all(outputs.map(output => this.criticScore(task, output)))
  }

}
