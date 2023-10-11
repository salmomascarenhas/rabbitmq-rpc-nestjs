# DEVELOPMENT
FROM node:18.14.2

# Instala na imagem pacotes necessários para o Imagemin manipular imagens
RUN apt-get update && apt-get install -y libglu1 libjpeg-dev libpng-dev libxi6 libgconf-2-4

# Define working directory e copia os packages do NPM para lá
WORKDIR /usr/src
COPY package*.json ./

# Instala dependências do projeto
RUN npm ci
ENV PATH /usr/src/node_modules/.bin:$PATH

# Copia pastas e arquivos do projeto para novo working directory
COPY . /usr/src/app/
WORKDIR /usr/src/app

RUN npm run build

# Cria pasta para armazenar arquivos de upload
RUN mkdir -p /data/upload
RUN chown -R node:node /data

USER node

CMD ["npm", "run", "start:dev"]