# baixar projeto
- git clone https://github.com/developerErisson/rl-loop.git
- crie ou copie e cole o arquivo .env.example 
- preencha a variavel OPENAI_API_KEY

# levantar container
- docker compose build
- docker compose up -d

## *obs*
- _projeto vai subir na porta 3000 interno e externo_
- _saidas do llm estao na pasta /outputs_

# api
- **method: POST**
- **route: /generate** 
- **body: {"task": "Escreva um script de vendas para uma loja de vinhos"}**