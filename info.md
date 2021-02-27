## knex migrations and seeds commands

-   `npx knex migrate:make migration_name` create a migration file
-   `npx knex migrate:latest` migrate the most recent migration file
-   `npx knex migrate:latest --debug` show the sql while migrating
-   `npx knex migrate:rollback` rollback migrations
-   `npx knex seed:make initial` create seed file
-   `npx knex seed:run` seed db with data
-   `npx knex migrate:rollback --env <environment>` rollback db on a given env e.g prod, dev test

## if psql refuses to expand a table or claim it is not ther

-   use this command and replace city with the table name`SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_name = 'city';`

# Objection js

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

## Inspired by [dannyfritz/commit-message-emoji](https://github.com/dannyfritz/commit-message-emoji)

See also [gitmoji](https://gitmoji.carloscuesta.me/).

| Commit type                | Emoji                                                     |
| :------------------------- | :-------------------------------------------------------- |
| Initial commit             | :tada: `:tada:`                                           |
| Version tag                | :bookmark: `:bookmark:`                                   |
| New feature                | :sparkles: `:sparkles:`                                   |
| Bugfix                     | :bug: `:bug:`                                             |
| Metadata                   | :card_index: `:card_index:`                               |
| Documentation              | :books: `:books:`                                         |
| Documenting source code    | :bulb: `:bulb:`                                           |
| Performance                | :racehorse: `:racehorse:`                                 |
| Cosmetic                   | :lipstick: `:lipstick:`                                   |
| Tests                      | :rotating_light: `:rotating_light:`                       |
| Adding a test              | :white_check_mark: `:white_check_mark:`                   |
| Make a test pass           | :heavy_check_mark: `:heavy_check_mark:`                   |
| General update             | :zap: `:zap:`                                             |
| Improve format/structure   | :art: `:art:`                                             |
| Refactor code              | :hammer: `:hammer:`                                       |
| Removing code/files        | :fire: `:fire:`                                           |
| Continuous Integration     | :green_heart: `:green_heart:`                             |
| Security                   | :lock: `:lock:`                                           |
| Upgrading dependencies     | :arrow_up: `:arrow_up:`                                   |
| Downgrading dependencies   | :arrow_down: `:arrow_down:`                               |
| Lint                       | :shirt: `:shirt:`                                         |
| Translation                | :alien: `:alien:`                                         |
| Text                       | :pencil: `:pencil:`                                       |
| Critical hotfix            | :ambulance: `:ambulance:`                                 |
| Deploying stuff            | :rocket: `:rocket:`                                       |
| Fixing on MacOS            | :apple: `:apple:`                                         |
| Fixing on Linux            | :penguin: `:penguin:`                                     |
| Fixing on Windows          | :checkered_flag: `:checkered_flag:`                       |
| Work in progress           | :construction: `:construction:`                           |
| Adding CI build system     | :construction_worker: `:construction_worker:`             |
| Analytics or tracking code | :chart_with_upwards_trend: `:chart_with_upwards_trend:`   |
| Removing a dependency      | :heavy_minus_sign: `:heavy_minus_sign:`                   |
| Adding a dependency        | :heavy_plus_sign: `:heavy_plus_sign:`                     |
| Docker                     | :whale: `:whale:`                                         |
| Configuration files        | :wrench: `:wrench:`                                       |
| Package.json in JS         | :package: `:package:`                                     |
| Merging branches           | :twisted_rightwards_arrows: `:twisted_rightwards_arrows:` |
| Bad code / need improv.    | :hankey: `:hankey:`                                       |
| Reverting changes          | :rewind: `:rewind:`                                       |
| Breaking changes           | :boom: `:boom:`                                           |
| Code review changes        | :ok_hand: `:ok_hand:`                                     |
| Accessibility              | :wheelchair: `:wheelchair:`                               |
| Move/rename repository     | :truck: `:truck:`                                         |
| Other                      | [Be creative](http://www.emoji-cheat-sheet.com/)          |

exports.up = function(knex) {
return knex.schema.alterTable("users", (table) => {
table.dropForeign("organization_id");

    table
      .foreign("organization_id")
      .references("organizations.id")
      .onDelete("CASCADE");

});
}

exports.down = function(knex) {
return knex.schema.alterTable("users", (table) => {
table.dropForeign("organization_id");

    table
      .foreign("organization_id")
      .references("organizations.id")
      .onDelete("NO ACTION");

});
