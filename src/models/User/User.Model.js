const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const schema = require("./user.schema.json");
const db = require("../../db");
const Freelancer = require("../Freelancer/Freelancer.Model");
const HiringManager = require("../HiringManager/HiringManager.Model");

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
                const freelancer = { user_id: user.id, industry_id: 1 };
                const f = await Freelancer.query().insert(freelancer);
                const h = await HiringManager.query()
                    .insert({
                        user_id: user.id,
                    })
                    .returning("*");

                console.log(f, h, "===========-====---");
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
