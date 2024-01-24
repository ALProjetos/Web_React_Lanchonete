# Use the official Node.js image as base
FROM node:latest

# Cria o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia os arquivos de configuração e dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o diretório de trabalho
COPY . .

# Compila o código TypeScript
RUN npm run build

# Expõe a porta em que a aplicação será executada
EXPOSE 4001

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]
