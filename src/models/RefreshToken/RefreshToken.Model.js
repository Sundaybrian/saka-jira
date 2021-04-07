const { Model } = require("objection");
const tableNames = require("../../constants/tableNames");
const schema = require("./refreshToken.schema.json");
const db = require("../../db");

class RefreshToken extends Model {
    static get tableName() {
        return tableNames.refresh_token;
    }

    static get jsonSchema() {
        return schema;
    }

    static get virtualAttributes() {
        return ["isExpired", "isActive"];
    }

    get isExpired() {
        return Date.now() >= this.expires;
    }

    get isActive() {
        return !this.revoked && !this.isExpired;
    }

    static modifiers = {
        defaultSelects(query) {
            const { ref } = RefreshToken;
            query.select(
                ref("id"),
                ref("token"),
                ref("account_id"),
                ref("expires"),
                ref("revoked"),
                ref("revokedByIp"),
                ref("replacedByToken"),
                ref("createByIp")
            );
        },
    };

    static get relationMappings() {
        const User = require("../User/User.Model");

        return {
            owner: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.refresh_token}.account_id`,
                    to: `${tableNames.user}.id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = RefreshToken;
