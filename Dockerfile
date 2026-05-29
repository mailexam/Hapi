FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY mail.js server.js ./

ENV HTTP_HOST=0.0.0.0
ENV HTTP_PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
