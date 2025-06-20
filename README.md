# baixando projeto
- git clone https://github.com/developerErisson/rl-loop.git
- crie o copie e cole o arquivo .env.example 
- preencha a variavel OPENAI_API_KEY

# levantar container
- docker compose build
- docker compose up -d

# obs
-projeto vai subir na porta 3000 interno e externo
-saidas do llm estao na pasta /outputs

# api
mothed POST 
route /generate 
body {"task": "Escreva um script de vendas para uma loja de vinhos"}