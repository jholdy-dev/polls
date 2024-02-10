FROM --platform=amd64 node:20-alpine
WORKDIR /app
COPY .env .
COPY ./package.json ./
COPY ./package-lock.json ./
COPY node_modules ./node_modules
COPY . .
EXPOSE 3000
RUN npm install -g pnpm
CMD [ "npm", "run", "start:dev" ]