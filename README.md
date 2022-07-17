# monacardjs

## Description

Nodejs implementation of Monacard.
It uses JavaScript, is built with TypeScript.
This is implemented with reference to the [MonacardHub](https://github.com/nachat1/MonacardHub).

## Installation

```bash
$ yarn install --frozen-lockfile
```

## DB

Start mysql DB for local.

```bash
// Start docker.
$ yarn docker:up

// initialize schema.
$ yarn init:db
```

Stop mysql DB.

```bash
$ yarn docker:down
```

## Migration

Generate

```bash
$ yarn migration:generate
```

Run.

```bash
$ yarn migration:run
```

Revert previous migration.

```bash
$ yarn migration:revert
```

Show migration history.

```bash
$ yarn migration:show
```


## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

When development or watch mode you can test api at `http://localhost:3000/`.

## Running the worker

Worker is not nestjs application. So you can run it as just JavaScript or typescript script.

``` bash
// example
$ yarn build
$ node ./dist/src/worker/read-new-monacard.js
```

## Setting of environment value

Create `.env` file in root directory from `.env.org`.

Hint: This application uses [dotenv](https://github.com/motdotla/dotenv).

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## lint and format

```bash
# lint by eslint
$ yarn lint

# format
$ yarn format
```

## License

[MIT licensed](https://github.com/ocknamo/monacardjs/blob/main/LICENCE).
