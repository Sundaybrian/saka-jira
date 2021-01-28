const crypto = require("crypto");
const bcrypt = require("bcrypt");

const tableNames = require("../../src/constants/tableNames");
const Role = require("../../src/constants/roles");

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await Promise.all(
        Object.keys(tableNames).map((name) => {
            return knex(name).del();
        })
    );

    const password = await bcrypt.hash("12345678yh", 10);

    const userOwner = {
        email: "sunday@owner.com",
        first_name: "sunday",
        last_name: "owner",
        password,
        role: Role.user,
        active: true,
        phone_number: "0712382366",
    };

    const companyUser = {
        name: "my-company",
        logo_url: "https://mylogourl-com",
        website_url: "https://mywebsitelog.com",
        email: "dummyemail@gmail.com",
        description: "my something comapny",
        email: "mycompany@gmail.com",
        active: true,
    };

    const diffOwner = {
        email: "diff@owner.com",
        first_name: "diff",
        last_name: "owner",
        password,
        role: Role.user,
        active: true,
        phone_number: "0712382367",
    };

    const staff = {
        email: "diff@staff.com",
        first_name: "diff",
        last_name: "staff",
        password,
        role: Role.staff,
        active: true,
        phone_number: "0711382367",
    };

    const adminUser = {
        email: "admin@admin.com",
        first_name: "admin",
        last_name: "admin",
        password,
        role: Role.admin,
        phone_number: "0712382368",
    };

    const userr = await knex(tableNames.user).insert(userOwner).returning("*");
    // await knex(tableNames.company).insert({
    //     ...companyUser,
    //     owner_id: userr[0].id,
    // });
    await knex(tableNames.user).insert(diffOwner);
    await knex(tableNames.user).insert(adminUser);
    await knex(tableNames.user).insert(staff);
};
