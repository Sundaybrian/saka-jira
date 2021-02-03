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

    const industry = {
        industry_name: "Computer Programming",
    };

    const userOwner = {
        email: "sunday@owner.com",
        first_name: "sunday",
        last_name: "owner",
        password,
        role: Role.user,
        active: true,
        phone_number: "0712382366",
    };

    const subscriptionType = {
        name: "Day",
        amount: 20,
        subscription_duration: "Day",
        duration_in_days: 1,
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
    
    // subscription
    await knex(tableNames.subscription_type).insert(subscriptionType);
    const diff = await knex(tableNames.user).insert(diffOwner).returning("*");

    await knex(tableNames.user).insert(adminUser);
    await knex(tableNames.user).insert(staff);

    // insert industries
    const industryy = await knex(tableNames.industry)
        .insert(industry)
        .returning("*");

    // insert freelancers
    await knex(tableNames.freelancer).insert({
        user_id: userr[0].id,
        industry_id: industryy[0].id,
    });

    await knex(tableNames.freelancer).insert({
        user_id: diff[0].id,
        industry_id: industryy[0].id,
    });

    // insert hiring manager
    await knex(tableNames.hiring_manager).insert({
        user_id: userr[0].id,
    });

    await knex(tableNames.hiring_manager).insert({
        user_id: diff[0].id,
    });
};
