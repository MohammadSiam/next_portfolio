# ==========================================
# STAGE 1: Dependencies
# ==========================================
FROM node:24-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci --legacy-peer-deps

# ==========================================
# STAGE 2: Builder
# ==========================================
FROM node:24-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build-time environment variables (NEXT_PUBLIC_* variables must be available at build time)
ARG NEXT_PUBLIC_ROOT_API_URL
ARG NEXT_PUBLIC_TINYMCE_API_KEY

# Set environment variables for build
ENV NEXT_PUBLIC_ROOT_API_URL=$NEXT_PUBLIC_ROOT_API_URL
ENV NEXT_PUBLIC_TINYMCE_API_KEY=$NEXT_PUBLIC_TINYMCE_API_KEY

RUN npm run build

# ==========================================
# STAGE 3: Production Runner
# ==========================================
FROM node:24-alpine AS production
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files from builder
COPY --from=builder /app/public ./public

# Standalone output (includes minimal node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Use the standalone server
CMD ["node", "server.js"]
