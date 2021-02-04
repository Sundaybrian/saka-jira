
const tableNames = require("../../src/constants/tableNames");

exports.seed = async function (knex) {
    
   const insertedSkills = await knex(tableNames.skill).insert({skill_name: "Plumbing"},
   {skill_name:"Python"});


   const job_statuses = await knex(tableNames.job_status).insert([
     {job_status_name: "accepting bids"},
     {job_status_name: "closed"},
     {job_status_name: "inprogress"}
   ])

    
};
