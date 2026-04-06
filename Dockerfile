FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY backend/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node backend/ ./

USER node
EXPOSE 5000

CMD ["node", "server.js"]
