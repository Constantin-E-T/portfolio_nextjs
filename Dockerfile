FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Add these two lines for Prisma
COPY prisma ./prisma
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start:prod"]