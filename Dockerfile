FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install

# Copy prisma schema and migrations
COPY prisma ./prisma/

# Generate Prisma Client
RUN pnpm prisma generate

# Copy rest of the app
COPY . .

# Build the app
RUN pnpm run build

EXPOSE 80

# Use start:prod which includes migrations
CMD ["pnpm", "run", "start:prod"]