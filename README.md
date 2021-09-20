## Saka Ajira

Backend for the Saka Ajira Jobs module

# Express API Starter

Includes API Server utilities:

-   [morgan](https://www.npmjs.com/package/morgan)
    -   HTTP request logger middleware for node.js
-   [helmet](https://www.npmjs.com/package/helmet)
    -   Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
-   [dotenv](https://www.npmjs.com/package/dotenv)
    -   Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`

Development utilities:

-   [nodemon](https://www.npmjs.com/package/nodemon)
    -   nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
-   [eslint](https://www.npmjs.com/package/eslint)
    -   ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
-   [mocha](https://www.npmjs.com/package/mocha)
    -   ☕️ Simple, flexible, fun JavaScript test framework for Node.js & The Browser ☕️
-   [supertest](https://www.npmjs.com/package/supertest)
    -   HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```

## Docs

To view the various endpoints lauch the backend `npm run dev` and navigate to `localhost:5000/api-docs`
Hosted docs [urady-backend](https://urady.herokuapp.com/api-docs/)

## Backend Setup

-   Create `.env` with your values. A sample env is provided
-   `npm install` to install dependencies
-   You can run the db as a container using `docker-compose up`
-   Migrate db using `npm run migrate`

### Entities

-   All entities will have, `created_at, updated_at and deleted_at`
-   Possibility for soft deletions later on

-   [x] user
-   [x] subscription_type
-   [x] job_status
-   [x] industry
-   [x] skill
-   [x] proposal_status
-   [x] payment_type

-   [x] freelancer
-   [x] hiring_manager
-   [x] freelancer_subscriptions
-   [x] has_skill
-   [x] freelancer_payments

-   [x] job
-   [x] proposal
-   [x] proposal_history
-   [] contract

## docker commands

-   sudo docker-compose up
-   sudo docker volume rm \$(sudo docker volume ls -q)
-   sudo docker system prune -a
-   sudo docker-compose down -v

## docker

-   docker build -t urady-node-service .
-   docker run -it -p -v $(pwd):./usr/app/user-service:ro -v /usr/app/user-service/node_modules -p 8001:4000 --name user-service urady-node-service # ro (read only bind mount, do docker can write to file system)
-   docker run -it -p -v $(pwd):./usr/app/user-service:ro -v /usr/app/user-service/node_modules --env-file ./env -p 8001:4000 --name user-service urady-node-service # ro (passing env var to docker container)
-   docker ps
-   docker image ls
-   docker image rm image_name -fv (-f for force v for volume)
-   docker exec -it <container name> /bin/bash #ssh into container

# remove dangling

-   docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
-   docker run -d --name node-app node-image
-   docker logs container_name || container_id
-   docker exec -it user-service bash
-   docker volume ls
-   docker volume prune
-   docker logs container_name -f

# Remove all containers

docker rm $(docker ps -aq)

# docker-compose

-   docker-compose up
-   docker-compose up --build
-   docker-compose down -v
-   docker exec -it backend-user-service sh #get inside container and run commands as usual

# running diff compose based on env

-   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
-   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

-   docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v-
-   docker-compose -f docker-compose.yml -f docker-compose.dev.yml down node-app --no-deps # start as service without dependent service

# volumes

-   volumes: #bind mounts
    -   ".:/usr/src/app"

## install and initialize knex

-   `npm i knex` install knex
-   `npx knex init` initialize knex; aknexfile.js will be created
- ` npx knex migrate:latest --env production`

```javascript
// Update with your config settings.
require("dotenv").config();

module.exports = {
    test: {
        client: "pg",
        connection: {
            // host: "127.0.0.1",
            database: process.env.POSTGRES_DB_TEST,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
        },
        migrations: {
            directory: __dirname + "/db/migrations",
        },

        seeds: {
            directory: __dirname + "/db/seeds",
        },
    },

    development: {
        client: "pg",
        connection: {
            // host: "127.0.0.1",
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
        },
        migrations: {
            directory: __dirname + "/db/migrations",
        },

        seeds: {
            directory: __dirname + "/db/seeds/",
        },
    },

    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: __dirname + "/db/migrations",
        },

        seeds: {
            directory: __dirname + "/db/seeds/production",
        },
    },
};
```

## knex migrations and seeds commands

-   `npx knex migrate:make migration_name` create a migration file
-   `npx knex migrate:latest` migrate the most recent migration file
-   `npx knex migrate:latest --debug` show the sql while migrating
-   `npx knex migrate:rollback` rollback migrations
-   `npx knex seed:make initial` create seed file
-   `npx knex seed:run` seed db with data
-   `npx knex:make seed_name --env production`
-   `npx knex migrate:rollback --env <environment>` rollback db on a given env e.g prod, dev test

## if psql refuses to expand a table or claim it is not ther

-   use this command and replace city with the table name`SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_name = 'city';`

## eslint

-   npx eslint --init

## jest

-   npx jest init

## Objection js

-   ORM. This is an example model with various table relations, you can use it a reference while creating models

```javascript
const { Model } = require("objection");

class Person extends Model {
    // Table name is the only required property.
    static get tableName() {
        return "persons";
    }

    // Each model must have a column (or a set of columns) that uniquely
    // identifies the rows. The column(s) can be specified using the `idColumn`
    // property. `idColumn` returns `id` by default and doesn't need to be
    // specified unless the model's primary key is something else.
    static get idColumn() {
        return "id";
    }

    // Methods can be defined for model classes just as you would for
    // any JavaScript class. If you want to include the result of these
    // method in the output json, see `virtualAttributes`.
    fullName() {
        return this.firstName + " " + this.lastName;
    }

    // Optional JSON schema. This is not the database schema!
    // No tables or columns are generated based on this. This is only
    // used for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    // See http://json-schema.org/ for more info.
    static get jsonSchema() {
        return {
            type: "object",
            required: ["firstName", "lastName"],

            properties: {
                id: { type: "integer" },
                parentId: { type: ["integer", "null"] },
                firstName: { type: "string", minLength: 1, maxLength: 255 },
                lastName: { type: "string", minLength: 1, maxLength: 255 },
                age: { type: "number" },

                // Properties defined as objects or arrays are
                // automatically converted to JSON strings when
                // writing to database and back to objects and arrays
                // when reading from database. To override this
                // behaviour, you can override the
                // Model.jsonAttributes property.
                address: {
                    type: "object",
                    properties: {
                        street: { type: "string" },
                        city: { type: "string" },
                        zipCode: { type: "string" },
                    },
                },
            },
        };
    }

    // This object defines the relations to other models.
    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
        const Animal = require("./Animal");
        const Movie = require("./Movie");

        return {
            pets: {
                // HasManyRelation: Use this relation when the related model has the foreign key
                relation: Model.HasManyRelation,
                // The related model. This can be either a Model
                // subclass constructor or an absolute file path
                // to a module that exports one. We use a model
                // subclass constructor `Animal` here.
                modelClass: Animal,
                join: {
                    from: "persons.id",
                    to: "animals.ownerId",
                },
            },

            movies: {
                // ManyToManyRelation: Use this relation when the model is related to a list of other models through a join table
                relation: Model.ManyToManyRelation,
                modelClass: Movie,
                join: {
                    from: "persons.id",
                    // ManyToMany relation needs the `through` object
                    // to describe the join table.
                    through: {
                        // If you have a model class for the join table
                        // you need to specify it like this:
                        // modelClass: PersonMovie,
                        from: "persons_movies.personId",
                        to: "persons_movies.movieId",
                    },
                    to: "movies.id",
                },
            },

            children: {
                relation: Model.HasManyRelation,
                modelClass: Person,
                join: {
                    from: "persons.id",
                    to: "persons.parentId",
                },
            },

            parent: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Person,
                join: {
                    from: "persons.parentId",
                    to: "persons.id",
                },
            },
        };
    }
}
```

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test

multiple tests might fail because of the run --inband command, will figure a way around it, so as to isolate the tests..but you can use the command below to run each test file separately
```

```
To run a test on a single file use
jest <filename> NODE_ENV=<environment> or add npx in the beginning
```

## Development

```
npm run dev
```

## kill a port that wont shutdown

sudo lsof -i :3000
kill -9 {PID}

## Deployment

-   `heroku login` login to your account
-   `heroku create <your-unique-app-name>` create app name also you can just run `heroku create` and allow heroku generate a name for you
-   `heroku addons:create heroku-postgresql:hobby-dev` setup postgres db. remember to save the postgres instance name heroku sends back.. it is of the form `postgresql-something-06892`check your terminal after running this command
-   `heroku config:set $(cat .env | sed '/^$/d; /#[[:print:]]*$/d')` push env variables to heroku
-   `heroku config:set NODE_ENV=production` overwite NODE_ENV to production
-   update knex file production setting to use heroku database url

    ```javascript
    production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
    min: 2,
    max: 10,
    },
    migrations: {
    directory: \_\_dirname + "/db/migrations",
    },

        seeds: {
            directory: __dirname + "/db/seeds",
        },
    },

    ```

-   `heroku pg:push <local_db_name> DATABASE_URL --app <app_name>` push your local db to heroku
-   git commit and git push heroku master
-   additional trick if you want to push to master branch from another branch `git push <remote> <local branch name>:<remote branch to push into>`
-   `heroku local web` test how your app looks like
-   `heroku run npm run migrate` to run latest migrations on the db, use it if you are sure about them

# install postgresql

-   https://computingforgeeks.com/install-postgresql-12-on-ubuntu/
