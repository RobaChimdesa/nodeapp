FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma  
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# Migrations, example seed row, then API (Railway / Compose)
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/server.js"]