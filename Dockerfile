FROM node:18-alpine3.14

COPY dist/server.mjs /server/dist/server.mjs

WORKDIR /server

CMD ["node", "dist/server.mjs"]
