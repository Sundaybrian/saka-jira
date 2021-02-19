const tableNames = require("../../../src/constants/tableNames");

exports.seed = async function (knex) {
    // job status catalog must be strictly in order
    await knex(tableNames.job_status).insert({
        job_status_name: "accepting bids",
    });
    await knex(tableNames.job_status).insert({
        job_status_name: "accepting bids",
    });
    await knex(tableNames.job_status).insert({
        job_status_name: "accepting bids",
    });
    await knex(tableNames.job_status).insert({
        job_status_name: "accepting bids",
    });

    // proposal_status catalog must be in order also
    await knex(tableNames.proposal_status).insert({
        proposal_status_name: "sent",
    });

    await knex(tableNames.proposal_status).insert({
        proposal_status_name: "accepted",
    });
    await knex(tableNames.proposal_status).insert({
        proposal_status_name: "rejected",
    });

    await knex(tableNames.proposal_status).insert({
        proposal_status_name: "feedback freelancer",
    });
    await knex(tableNames.proposal_status).insert({
        proposal_status_name: "inprogress",
    });

    await knex(tableNames.proposal_status).insert({
        proposal_status_name: "feedback client",
    });
    await knex(tableNames.proposal_status).insert({
        proposal_status_name: "completed",
    });

    // skills dont matter the order
    const insertedSkills = await knex(tableNames.skill).insert([
        { skill_name: "Plumbing" },
        { skill_name: "Python" },
    ]);

    // const industries
    const industries = await knex(tableNames.industry).insert([
        { industry_name: "Accounting" },
        { industry_name: "Airlines/Aviation" },
        { industry_name: "Alternative Dispute Resolution" },
        { industry_name: "Alternative Medicine" },
        { industry_name: "Animation" },
        { industry_name: "Apparel and  Fashion" },
        { industry_name: "Architecture and  Planning" },
        { industry_name: "Arts and  Crafts" },
        { industry_name: "Automotive" },
        { industry_name: "Aviation and  Aerospace" },
        { industry_name: "Banking" },
        { industry_name: "Biotechnology" },
        { industry_name: "Broadcast Media" },
        { industry_name: "Building Materials" },
        { industry_name: "Business Supplies and  Equipment" },
        { industry_name: " Capital Markets" },
        { industry_name: "Chemicals" },
        { industry_name: "Civic and  Social Organization" },
        { industry_name: "Civil Engineering" },
        { industry_name: " Commercial Real Estate" },
        { industry_name: " Computer and  Network Security" },
        { industry_name: "Computer Games" },
        { industry_name: "Computer Hardware" },
        { industry_name: "Computer Networking" },
        { industry_name: "Computer Software" },
        { industry_name: "Construction" },
        { industry_name: "Consumer Electronics" },
        { industry_name: "Consumer Goods" },
        { industry_name: "Consumer Services" },
        { industry_name: "Cosmetics" },
        { industry_name: "Dairy" },
        { industry_name: "Defense and  Space" },
        { industry_name: "Design" },
        { industry_name: "E-learning" },
        { industry_name: "Education Management" },
        { industry_name: " Electrical and  Electronic Manufacturing" },
        { industry_name: "Entertainment" },
        { industry_name: "Environmental Services" },
        { industry_name: "Events Services" },
        { industry_name: "Executive Office" },
        { industry_name: " Facilities Services" },
        { industry_name: "Farming" },
        { industry_name: "Financial Services" },
        { industry_name: "Fine Art" },
        { industry_name: "Fishery" },
        { industry_name: "Food and  Beverages" },
        { industry_name: "Food Production" },
        { industry_name: "Fundraising" },
        { industry_name: "Furniture" },
        { industry_name: "Gambling and  Casinos" },
        { industry_name: "Glass, Ceramics and  Concrete" },
        { industry_name: "Government Administration" },
        { industry_name: "Government Relations" },
        { industry_name: "Graphic Design" },
        { industry_name: "Health, Wellness and  Fitness" },
        { industry_name: "Higher Education" },
        { industry_name: "Hospital and  Health Care" },
        { industry_name: "Hospitality" },
        { industry_name: "Human Resources" },
        { industry_name: "Import and  Export" },
        { industry_name: "Individual and  Family Services" },
        { industry_name: "Industrial Automation" },
        { industry_name: "Information Services" },
        { industry_name: "Information Technology and  Services" },
        { industry_name: "Insurance" },
        { industry_name: "International Affairs" },
        { industry_name: "International Trade and  Development" },
        { industry_name: "Internet" },
        { industry_name: "Investment Banking" },
        { industry_name: "Investment Management" },
        { industry_name: "Judiciary" },
        { industry_name: "Law Enforcement" },
        { industry_name: "Law Practice" },
        { industry_name: "Legal Services" },
        { industry_name: "Legislative Office" },
        { industry_name: "Leisure, Travel and  Tourism" },
        { industry_name: "Libraries" },
        { industry_name: "Logistics and  Supply Chain" },
        { industry_name: "Luxury Goods and Jewelry" },
        { industry_name: "Machinery" },
        { industry_name: "Management Consulting" },
        { industry_name: "Maritime" },
        { industry_name: "Market Research" },
        { industry_name: "Marketing and Advertising" },
        { industry_name: " Mechanical Or Industrial Engineering" },
        { industry_name: " Media Production" },
        { industry_name: "Medical Device" },
        { industry_name: "Medical Practice" },
        { industry_name: " Mental Health Care" },
        { industry_name: "Military" },
        { industry_name: "Mining and Metals" },
        { industry_name: "Mobile Games" },
        { industry_name: "Motion Pictures and Film" },
        { industry_name: "Museums and Institutions" },
        { industry_name: "Music" },
        { industry_name: " Nanotechnology" },
        { industry_name: "Newspapers" },
        { industry_name: "Non-profit Organization Management" },
        { industry_name: "Oil and Energy" },
        { industry_name: "Online Media" },
        { industry_name: "Outsourcing/Offshoring" },
        { industry_name: "Package/Freight Delivery" },
        { industry_name: " Packaging and  Containers" },
        { industry_name: "Paper and  Forest Products" },
        { industry_name: "Performing Arts" },
        { industry_name: "Pharmaceuticals" },
        { industry_name: "Philanthropy" },
        { industry_name: "Photography" },
        { industry_name: " Plastics" },
        { industry_name: " Political Organization" },
        { industry_name: "Primary/Secondary Education" },
        { industry_name: "Printing" },
        { industry_name: " Professional Training and  Coaching" },
        { industry_name: " Program Development" },
        { industry_name: "Public Policy" },
        { industry_name: "Public Relations and  Communications" },
        { industry_name: "Public Safety" },
        { industry_name: "Publishing" },
        { industry_name: "Railroad Manufacture" },
        { industry_name: "Ranching" },
        { industry_name: "Real Estate" },
        { industry_name: "Recreational Facilities and  Services" },
        { industry_name: "Religious Institutions" },
        { industry_name: " Renewables and  Environment" },
        { industry_name: "Research" },
        { industry_name: "Restaurants" },
        { industry_name: "Retail" },
        { industry_name: " Security and  Investigations" },
        { industry_name: " Semiconductors" },
        { industry_name: "Shipbuilding" },
        { industry_name: "Sporting Goods" },
        { industry_name: "Sports" },
        { industry_name: " Staffing and  Recruiting" },
        { industry_name: "Supermarkets" },
        { industry_name: "Telecommunications" },
        { industry_name: "Textiles" },
        { industry_name: " Think Tanks" },
        { industry_name: "Tobacco" },
        { industry_name: " Translation and  Localization" },
        { industry_name: "Transportation/Trucking/Railroad" },
        { industry_name: "Utilities" },
        { industry_name: " Venture Capital and  Private Equity" },
        { industry_name: "Veterinary" },
        { industry_name: "Warehousing" },
        { industry_name: " Wholesale" },
        { industry_name: " Wine and  Spirits" },
        { industry_name: " Wireless" },
        { industry_name: " Writing and  Editing" },
    ]);
};
