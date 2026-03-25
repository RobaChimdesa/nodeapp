FROM node:20-alpine

WORKDIR /app

# Prisma requires a non-empty DATABASE_URL for `prisma generate` / schema validation.
# We provide a dummy value at build time; Railway runtime env will override it.
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mydb

COPY package*.json ./
COPY prisma ./prisma  
RUN npm ci --ignore-scripts

COPY . .

RUN npx prisma generate
RUN npx tsc

EXPOSE 3000

# Migrations, example seed row, then API (Railway / Compose)
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npx prisma db seed && node dist/server.js"]