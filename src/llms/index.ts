import { OpenAIClient } from "./openaiClient.js"

export function createLLM() {
  const provider = process.env.LLM_PROVIDER ?? "openai"

  switch (provider) {
    case "openai":
      if (!process.env.OPENAI_API_KEY) {
        console.error( "OPENAI_API_KEY nao encontrado na env")
        process.exit(1)
      }
      return new OpenAIClient(process.env.OPENAI_API_KEY)
    default:
      console.error(`LLM_PROVIDER '${provider}' n suportado`)
      process.exit(1)
  }
}
