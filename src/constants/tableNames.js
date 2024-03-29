module.exports = {
    //jobs module without fk references
    user: "user",
    refresh_token: "refresh_token",
    subscription_type: "subscription_type",
    job_status: "job_status",
    industry: "industry",
    skill: "skill",
    proposal_status: "proposal_status",
    payment_type: "payment_type",
    // with fk reference
    freelancer: "freelancer",
    hiring_manager: "hiring_manager",
    freelancer_subscriptions: "freelancer_subscriptions",
    has_skill: "has_skill",
    freelancer_payments: "freelancer_payments",
    other_skills: "other_skills",
    company_docs: "company_docs",
    // with multiple fk references
    job: "job",
    proposal: "proposal",
    proposal_history: " proposal_history",
    contract: "contract",
    company: "company",
};
