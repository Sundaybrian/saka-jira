function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.datetime("deleted_at");
    table.boolean("deleted").notNullable().defaultTo(false);
}

function addDefaultGeoLocations(table) {
    table.double("latitude").defaultTo(0);
    table.double("longitude").defaultTo(0);
}

function addDefaultColumnsUser(table) {
    table.increments().notNullable();
    table.string("first_name", 50).notNullable();
    table.string("last_name", 50).notNullable();
    table.string("email", 254).notNullable().unique();
    table.string("phone_number", 15).notNullable().unique();
    table.string("password", 180).notNullable();
    table.string("role", 10).notNullable().defaultTo("user");
    table.boolean("active").notNullable().defaultTo(false);
    table.datetime("verified");
    table.boolean("isVerified").notNullable().defaultTo(false);
    table.string("verification_token", 300);
    table.string("resetToken", 300);
    table.datetime("reset_token_expires");
    table.datetime("password_reset");
    table.string("image_url", 2000);
}

function references(table, tableName, columnName = null, notNullable = true) {
    const definition = table
        .integer(`${columnName || tableName}_id`)
        .unsigned()
        .references("id")
        .inTable(tableName)
        .onDelete("cascade");

    if (notNullable) {
        definition.notNullable();
    }

    return definition;
}

function url(table, columnName) {
    table.string(columnName, 2000);
}

function email(table, columnName) {
    return table.string(columnName, 254);
}

module.exports = {
    addDefaultColumns,
    addDefaultColumnsUser,
    addDefaultGeoLocations,
    references,
    url,
    email,
};
