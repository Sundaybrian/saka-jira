require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const tableNames = require("../../../src/constants/tableNames");
const Role = require("../../../src/constants/roles");

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));

    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 8);

    const ADMIN = {
        email: process.env.ADMIN_EMAIL,
        first_name: "Kennedy",
        last_name: "Njoroge",
        password,
        role: Role.admin,
        active: true,
        phone_number: "254714382366",
    };

    const user = await knex(tableNames.user).insert(ADMIN).returning("*");
};
