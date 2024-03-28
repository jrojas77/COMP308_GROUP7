# COMP308_GROUP7

Group Project COMP308 g7

Backend

## Before running the project

Verify you have the appropiate versions of:

`nodejs => v20.11.1`
`npm => 10.5.0`

## Running locally

To run locally first make sure you have run the following command:

`npm install`

then make sure you have the .env file corretly. This file won't be uploaded to version control due to some confidential data that should not be uploaded.

Then run the project with

`npm run dev`

using this command will run the require command for the dotenv config function, this will avoid adding it to the server.mjs file

## Required .env

```
DB = mongoconnectionstring
JWT_SECRET = a_secret
PORT = server port || 3000
NODE_OPTIONS=--experimental-vm-modules jest
```

## Authentication

Authentication using JWT token via Bearer Authorization header.
Sample:

```
Authorization: Bearer <token>
```

### Sign up sample

Request

```
mutation Signup {
    signup(
        firstName: "Maxwel"
        lastName: "Santana"
        email: "test14@test.com"
        password: "123456"
        type: "patient"
    ) { token }
}
```

Response

```
{
    "data": {
        "signup": {
            "token": <token>
        }
    }
}
```

### Login sample

```
mutation Login {
    login(email: "test14@test.com", password: "123456") {
        token
    }
}
```

Same response with token as above

### Access Protected Resource

```
query Users {
    me {
        _id
        email
        firstName
        lastName
        type
    }
}
```

Plus add Header

```
Authorization: Bearer <token>
```

### Curl sample

```
curl --location 'http://localhost:3000/graphql' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{"query":"query Users {\r\n    me {\r\n        _id\r\n        email\r\n        firstName\r\n        lastName\r\n        type\r\n    }\r\n}","variables":{}}'
```
