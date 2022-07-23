###################
# BUILD FOR PRODUCTION
###################

FROM node:18.6-alpine3.15

USER node

WORKDIR /home/node

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

ENV NODE_ENV production

RUN yarn build
RUN if [ ! -f ".env" ]; then cp .env.org .env ; fi

CMD ["node", "dist/src/main"]
