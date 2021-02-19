const crypto = require("crypto");
const bcrypt = require("bcrypt");

const tableNames = require("../../../src/constants/tableNames");
const Role = require("../../../src/constants/roles");

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await Promise.all(
        Object.keys(tableNames).map((name) => {
            return knex(name).del();
        })
    );

    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const ADMIN = {
        email: "uraditech@gmail.com",
        first_name: "Kennedy",
        last_name: "Maina",
        password,
        role: Role.admin,
        active: true,
        phone_number: "254701060103",
    };

    const user = await knex(tableNames.user).insert(ADMIN).returning("*");
};
