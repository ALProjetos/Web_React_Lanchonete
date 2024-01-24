https://www.digitalocean.com/community/tutorials/como-construir-uma-aplicacao-node-js-com-o-docker-pt

# Acessando aplicação tanto local quanto docker
http://host.docker.internal:4001
http://localhost:4001

# Criar novo projeto node com typescript
npm init -y
npm install express mongoose typescript ts-node @types/node @types/express @types/mongoose

# Rodar com imagem do mongodb
# Construa e execute os contêineres:
docker-compose up --build

# Construir a imagem Docker
docker build -t nome-do-seu-container .

# Deletar todas imagens
docker system prune --force

# Executar o contêiner
docker run -p 4001:4001 nome-do-seu-container

# Lista imagens
docker ps -a

# Parar uma imagem
docker stop container-id

# Remover imagem
docker images -a
docker rmi image-id
docker image rm --force image-id
