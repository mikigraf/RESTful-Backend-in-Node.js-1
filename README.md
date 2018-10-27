# WSIT-Restful-Backend-API

## .env

```bash
BASE_URL=http://localhost:8080
MONGODB_URI=mongodb://<app admin username>:<app admin password>@localhost:27017/wsit

SESSION_SECRET=Your Session Secret goes here

FACEBOOK_ID=
FACEBOOK_SECRET=

GOOGLE_ID=
GOOGLE_SECRET=

# Global settings for every client
DEFAULT_AMOUNT_OF_CARDS=1
STARTING_BALANCE=0
GUESTS_ALLOWED=true
CLIENT_NAME='Mikolaj Wawrzyniak'
CLIENT_ADDRESS='Sesame Street 187'
```

## Requierments

- Node.js
- NPM
- Docker

## Setup

1. Configure .env by adding your API key pairs.
2. Build docker images by running

```bash
docker build --no-cache .
```

## Running the project:

```bash
docker-compose up --build
```

## if dependencies cannot be found:

```bash
docker-compose down
docker-compose up --build
```

## Generate the documentation

In order to generate the documentation, it is required to install [apidoc](http://apidocjs.com/#install) module from npm.

```bash
npm install apidoc -g
```

After that you can run

```bash
apidoc -i app/routes/ -o apidoc/
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

## Monitoring

Monitoring is done with **Express monitor**.

It's available under [http://localhost:8080/status](http://localhost:8080/status)

## Login/Registration

Login and registration are possible by using:

- combination of username and password
- Facebook authentication
- Google authentication

For users using Facebook and Google it will be possible to authenticate using username and password. Email address can be used as username and their password will be sent to their email address after registration.

For social auth with Google, create credentials for Google+ API in the Google Developer Console.

For Facebook, create credentials for Facebook Login API.

## Setting up email adress

In order to setup emails, configure environmental variables accordingly.
For GMAIL it is necessary to [Allow less secure apps](https://myaccount.google.com/u/4/lesssecureapps?pageId=none&pli=1)
