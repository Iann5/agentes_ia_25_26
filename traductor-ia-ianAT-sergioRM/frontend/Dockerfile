FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g live-server

EXPOSE 5173

CMD ["live-server", "--host=0.0.0.0", "--port=5173", "--no-browser", "--quiet"]