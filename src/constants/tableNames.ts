module.exports = {
    //jobs module without fk references
    user: "user",
    subscription_type: "subscription_type",
    job_status: "job_status",
    industry: "industry",
    skill: "skill",
    proposal_status: "propasal_status",
    payment_type: "payment_type",
    // with fk reference
    freelancer: "freelancer",
    hiring_manager: "hiring_manager",
    freelancer_subcriptions: "freelancer_subcriptions",
    has_skill: "has_skill",
    freelancer_payments: "freelancer_payments",
    // with multiple fk references
    job: "job",
    proposal: "proposal",
    proposal_history: "history",
    contract: "contract",
};
