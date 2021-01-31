const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const schema = require("./user.schema.json");
const Freelancer = require("../Freelancer/Freelancer.Model");

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
            } else {
                console.log("Nothing to see here");
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
