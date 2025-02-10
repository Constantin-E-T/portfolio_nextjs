# Update your Dockerfile
FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma Client but don't run migrations
RUN npx prisma generate

# Copy rest of the app
COPY . .

# Build the app
RUN npm run build

EXPOSE 80

# Modify the start command to not include migrations
CMD ["npm", "run", "start:prod"]