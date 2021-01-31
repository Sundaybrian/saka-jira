const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./user.schema.json");
const Freelancer = require("../Freelancer/Freelancer.Model");
const { log } = require("console");

class User extends Model {
    static get tableName() {
        return tableNames.user;
    }

    static get jsonSchema() {
        return schema;
    }

    static async afterInsert({ items, inputItems, relation, context }) {
        try {
            const user = inputItems[0];
            if (user.role == "user") {
                const freelancer = { user_id: user.id };
                const f = await Freelancer.query().insert(freelancer);

                console.log(f);
            } else {
                console.log("Nothing to see here");
            }
        } catch (error) {
            throw error;
        }
    }
}

Model.knex(db);

module.exports = User;
