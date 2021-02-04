const { Model } = require("objection");
const Cursor = require("../cursorPagination");

const tableNames = require("../../constants/tableNames");
const schema = require("./user.schema.json");
const db = require("../../db");

class User extends Cursor(Model) {
    static get tableName() {
        return tableNames.user;
    }

    static get jsonSchema() {
        return schema;
    }

    static modifiers = {
        defaultSelects(query) {
            const { ref } = User;
            query.select(
                ref("id"),
                ref("first_name"),
                ref("last_name"),
                ref("email"),
                ref("phone_number"),
                ref("active"),
                ref("image_url"),
                ref("password")
            );
        },

        defaultSelectsWithoutPass(query) {
            const { ref } = User;
            query.select(
                ref("id"),
                ref("first_name"),
                ref("last_name"),
                ref("email"),
                ref("phone_number"),
                ref("active"),
                ref("image_url")
            );
        },
    };

    static async afterInsert({ items, inputItems, relation, context }) {
        const Freelancer = require("../Freelancer/Freelancer.Model");
        const HiringManager = require("../HiringManager/HiringManager.Model");
        try {
            const user = inputItems[0];
            if (user.role == "user") {
                const freelancer = { user_id: user.id, industry_id: 1 };
                const f = await Freelancer.query().insert(freelancer);
                const h = await HiringManager.query().insert({
                    user_id: user.id,
                });
            } else {
                console.log(
                    "Nothing to see here, freelancer and hiringManager Created"
                );
            }
        } catch (error) {
            throw error;
        }
    }

    static get relationMappings() {
        const Freelancer = require("../Freelancer/Freelancer.Model");
        const HiringManager = require("../HiringManager/HiringManager.Model");

        return {
            freelancer: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.HasOneRelation,
                modelClass: Freelancer,
                join: {
                    from: `${tableNames.user}.id`,
                    to: `${tableNames.freelancer}.user_id`,
                },
            },

            hiringManager: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.HasOneRelation,
                modelClass: HiringManager,
                join: {
                    from: `${tableNames.user}.id`,
                    to: `${tableNames.hiring_manager}.user_id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = User;
