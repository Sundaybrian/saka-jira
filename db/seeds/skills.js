const tableNames = require("../../src/constants/tableNames");

exports.seed = async function (knex) {
    const _date = new Date();
    const start_date = new Date().toISOString();
    const end_date = new Date(_date.setDate(13)).toISOString();

    const insertedSkills = await knex(tableNames.skill).insert([
        { skill_name: "Plumbing" },
        { skill_name: "Python" },
    ]);

    const job_statuses = await knex(tableNames.job_status).insert([
        { job_status_name: "accepting bids" },
        { job_status_name: "closed" },
        { job_status_name: "inprogress" },
    ]);

    const jobs = await knex(tableNames.job).insert([
        {
            title: "python developer wanted 1",
            description: "looking for a super developer ",
            main_skill: "python",
            industry_id: 1,
            hiring_manager_id: 1,
            job_status_id: 1,
            budget_range_min: 25000,
            start_date,
            end_date,
            budget_range_max: 50000,
            latitude: 38.933354,
            longitude: -1.454646,
        },
        {
            title: "python developer wanted hr 2",
            description: "looking for a super developer 2",
            hiring_manager_id: 2,
            main_skill: "python",
            industry_id: 1,
            job_status_id: 1,
            budget_range_min: 25000,
            start_date,
            end_date,
            budget_range_max: 50000,
            latitude: 38.933354,
            longitude: -1.454646,
        },
        {
            title: "python developer wanted some 2",
            description: "looking for a super developer ",
            main_skill: "python",
            industry_id: 1,
            hiring_manager_id: 2,
            job_status_id: 1,
            budget_range_min: 25000,
            start_date,
            end_date,
            budget_range_max: 50000,
            latitude: 38.933354,
            longitude: -1.454646,
        },
        {
            title: "js developer wanted",
            hiring_manager_id: 2,
            description: "looking for a super developer ",
            main_skill: "python",
            industry_id: 1,
            job_status_id: 1,
            budget_range_min: 25000,
            start_date,
            end_date,
            budget_range_max: 50000,
            latitude: 38.933354,
            longitude: -1.454646,
        },
    ]);

    // proposal status catalog

    const proposal_status = await knex(tableNames.proposal_status).insert([
        { proposal_status_name: "sent" },
        { proposal_status_name: "accepted" },
        { proposal_status_name: "rejected" },
        { proposal_status_name: "feedback freelancer" },
        { proposal_status_name: "feedback client" },
        { proposal_status_name: "completed" },
    ]);
};
