# ── Stage 1: Build the Vite frontend ──────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build          # outputs to /app/dist

# ── Stage 2: Production runtime (Express serves API + static files) ────────
FROM node:20-alpine
WORKDIR /app

# Copy only what the server needs at runtime
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY server ./server

# Cloud Run injects $PORT at runtime (defaults to 8080)
ENV PORT=8080
EXPOSE 8080

# Do NOT copy .env — GEMINI_API_KEY comes from Cloud Run env vars
CMD ["node", "server/index.js"]
