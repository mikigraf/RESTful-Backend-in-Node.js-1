# WSIT-Restful-Backend-API

## Requierments

- Node.js
- NPM
- Docker

## Setup

1. Configure .env by adding your API key pairs.

## Running the project:

```bash
docker compose-up
```

## Generate the documentation

In order to generate the documentation, it is required to install [documentjs](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md) module from npm.

```bash
npm install -g documentation
```

After that you can run

```bash
documentation build app/routes/** -f html -o docs
```

This will generate **docs** directory in the main project directory containing the documentation of API routes.
