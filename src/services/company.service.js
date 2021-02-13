const Company = require("../models/Company/Company.Model");

class CompanyService {
    constructor() {}

    static async create(params) {
        try {
            // validate if company name exists
            if (await getCompany({ name: params.name })) {
                error('Name "' + params.name + '" is already registered');
            }

            const company = await Company.query().insert(params);

            return company;
        } catch (error) {
            throw error;
        }
    }

    static async getAllCompanies(next = null, match, limit) {
        try {
            let companies = await Company.query()
                .where(match)
                .modify("defaultSelects")
                .withGraphFetched(`owner(defaultSelects)`)
                .orderBy("id")
                .limit(limit)
                .cursorPage();

            if (next) {
                companies = await Company.query()
                    .where(match)
                    .modify("defaultSelects")
                    .withGraphFetched(`owner(defaultSelects)`)
                    .orderBy("id")
                    .limit(limit)
                    .cursorPage(next);
            }

            return companies;
        } catch (error) {
            throw error;
        }
    }

    // static async getMyCompanies(ownerId) {
    //     const companies = await Company.query().where({
    //         owner_id: ownerId,
    //     });
    //     return companies;
    // }

    static async getCompanyById(id) {
        try {
            const company = await getCompany({ id });
            if (!company) return null;
            return company;
        } catch (error) {
            throw error;
        }
    }

    static async updateCompany(queryParams, params) {
        try {
            const company = await getCompany({ ...queryParams });

            if (!company) {
                return null;
            }

            // validate if name was changed
            if (
                params.name &&
                company.name !== params.name &&
                (await getCompany({ name: params.name }))
            ) {
                const error = new Error(`Name ${params.name} is already taken`);
                throw error;
            }

            const updatedCompany = await Company.query().patchAndFetchById(
                queryParams.id,
                {
                    ...params,
                }
            );

            return updatedCompany;
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        try {
            const tobeDeleted = await getCompany({ id });

            if (tobeDeleted) {
                return await Company.query().deleteById(id);
            }

            return null;
        } catch (error) {
            throw error;
        }
    }

    // =========== helpers===========

    static async getCompany(param) {
        try {
            const company = await Company.query()
                .where({ ...param })
                .modify("defaultSelects")
                .withGraphFetched("owner(defaultSelects)")
                .first();
            return company;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CompanyService;
