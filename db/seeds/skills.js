
const tableNames = require("../../src/constants/tableNames");

exports.seed = async function (knex) {
    
   const skills = [
     {skill_name: "Plumbing"},
     {skill_name:"Python"}
   ]

    
   const insertedSkills = await knex(tableNames.skill).insert(skills);

    
};
