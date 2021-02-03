const { Model } = require("objection");
const cursorMixin = require('objection-cursor');
const keysetPagination = require('objection-keyset-pagination')({limit:5, countTotal:true,
hasNext: true});

const cursor = cursorMixin({
    limit: 5, // Default limit in all queries
    results: true, // Page results
    nodes: false, // Page results where each result also has an associated cursor
    pageInfo: {
      // When true, these values will be added to `pageInfo` in query response
      total: false, // Total amount of rows
      remaining: true, // Remaining amount of rows in *this* direction
      remainingBefore: false, // Remaining amount of rows before current results
      remainingAfter: false, // Remaining amount of rows after current results
      hasMore: true, // Are there more rows in this direction?
      hasNext: true, // Are there rows after current results?
      hasPrevious: true, // Are there rows before current results?
    }
  });

const tableNames = require("../../constants/tableNames");
const schema = require("./user.schema.json");
const db = require("../../db");
const Freelancer = require("../Freelancer/Freelancer.Model");
const HiringManager = require("../HiringManager/HiringManager.Model");

class User extends cursor(Model) {
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
