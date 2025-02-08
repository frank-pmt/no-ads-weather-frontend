# Image to build application
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./

COPY src/ ./src/
COPY public/ ./public/
COPY next.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./
COPY tsconfig*.json ./

ENV NEXT_PUBLIC_API_URL '/api'


# Build the application
RUN npm install
RUN npm run build

# Image to run application
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000

ENV PORT 3000

ENV HOSTNAME "0.0.0.0"

# CMD ["node", "server.js"]
CMD ["sh", "-c", "ls -la && echo '=== .next directory ===' && ls -la .next/ && node server.js"]
