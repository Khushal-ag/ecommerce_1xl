FROM node:alpine

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm i

COPY . .

ENTRYPOINT pnpm serve