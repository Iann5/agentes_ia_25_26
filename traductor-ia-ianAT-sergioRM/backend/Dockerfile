FROM node:20-alpine

WORKDIR /app

# Dependencias para compilar módulos nativos
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
