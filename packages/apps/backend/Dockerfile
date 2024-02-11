FROM --platform=amd64 node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY .env .
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD [ "pnpm", "run", "start:dev" ]