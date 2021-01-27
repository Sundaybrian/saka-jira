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
