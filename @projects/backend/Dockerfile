FROM --platform=amd64 node:20-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
COPY node_modules ./node_modules
COPY ./dist .
CMD [ "node", "main" ]