###################
# BUILD FOR PRODUCTION
###################

FROM node:18.6-alpine3.15

RUN apk update
RUN apk add curl

USER node

WORKDIR /home/node

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

ENV NODE_ENV production

RUN yarn build
RUN if [ ! -f ".env" ]; then cp .env.org .env ; fi

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost/api/health || exit 1

# api
# ["node", "dist/src/main"]
# worker
# ["node", "./dist/src/worker/read-new-monacard.js"]
CMD ["node", "dist/src/main"]
