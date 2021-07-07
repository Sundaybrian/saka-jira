const CompanyDocs = require("../models/Company/CompanyDocs/CompanyDocs.Model");

class CompanyDocsService {
    constructor() {}

    static async addDoc(params) {
        try {
            const doc = await CompanyDocs.query().insert({
                ...params,
            });

            return doc;
        } catch (error) {
            throw error;
        }
    }

    // fetch company docs by owner/admin
    static async getDocs(company_id) {
        try {
            const docs = await CompanyDocs.query().where({ company_id });
            return docs;
        } catch (error) {
            throw error;
        }
    }

    // TODO update doc

    // owners/admin can delete document
    static async _removeDoc(params) {
        const { id } = params;
        const doc = await this.getDoc({ id });
        if (!doc) {
            return null;
        }

        await CompanyDocs.query().deleteById(id);

        return true;
    }

    // helper
    static async getDoc(params) {
        const skill = await CompanyDocs.query()
            .where({ ...params })
            .first();

        return skill;
    }
}

module.exports = CompanyDocsService;
