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

# Database

Starting bash of a running container

```bash
docker ps
```

lists all running images.
In order to use bash, you'll need to use

```bash
docker exec -it <container_id> bash
```

You can switch to **MongoDB shell** by typing:

```bash
mongo
```

There is already one user, that has been created.

```bash
db.createUser({user: 'ad', pwd: 'adel56@', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
Successfully added user: {
        "user" : "ad",
        "roles" : [
                {
                        "role" : "userAdminAnyDatabase",
                        "db" : "admin"
                }
        ]
}
```

So for administrator login and password, you can use:
login: **ad**
password: **adel56@**

A database **wsit** has been created for this project with

```bash
use wsit
```

A user for our APP has been created with following comands:

```bash
db.createUser({ user: 'backend_app_admin', pwd: 'baa@&%#/', roles: ["readWrite", "dbAdmin"] });
Successfully added user: { "user" : "backend_app_admin", "roles" : [ "readWrite", "dbAdmin" ] }
```

So our application can use:
login: **backend_app_admin**
password: **baa@&%#/**

to exercise admin rights in the database. This has been created for security.
