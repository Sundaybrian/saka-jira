const request = require("supertest");
const app = require("../src/app");

let token1, token2, token3;

beforeAll(function (done) {
    request(app)
        .post("/api/v1/accounts/login")
        .send({
            email: "admin@admin.com",
            password: "12345678yh",
        })
        .end(function (err, res) {
            if (err) throw err;
            token1 = res.body.token;

            request(app)
                .post("/api/v1/accounts/login")
                .send({
                    email: "sunday@owner.com",
                    password: "12345678yh",
                })
                .end(function (err, res) {
                    if (err) throw err;
                    token2 = res.body.token;
                    request(app)
                        .post("/api/v1/accounts/login")
                        .send({
                            email: "diff@owner.com",
                            password: "12345678yh",
                        })
                        .end(function (err, res) {
                            if (err) throw err;
                            token3 = res.body.token;
                            done();
                        });
                });
        });
});

// post tests
describe("POST /api/v1/company/${company.id}/company-docs", () => {
    it("should fail to create doc missing description", async () => {
        const res = await request(app)
            .post(`/api/v1/company/1/company-docs`)
            .set("Authorization", `Bearer ${token2}`)
            .send({
                document_type: "Joi.string().required()",
                document_number: "",
                document_url: "https://exmapl.com",
            })
            .expect("Content-Type", /json/)
            .expect(400);
    });

    it("should create a doc", async () => {
        const res = await request(app)
            .post(`/api/v1/company/1/company-docs`)
            .set("Authorization", `Bearer ${token2}`)
            .send({
                document_type: "Joi.string().required()",
                document_number: "",
                description: "example desc",
                document_url: "https://exmapl.com",
            })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.description).toBe("example desc");
    });
});

// get docs tests
describe("GET api/v1/company/1/company-docs", () => {
    beforeEach(function (done) {
        request(app)
            .post(`/api/v1/company/1/company-docs`)
            .set("Authorization", `Bearer ${token2}`)
            .send({
                document_type: "Joi.string().required()",
                document_number: "",
                description: "example desc",
                document_url: "https://exmapl.com",
            })
            .end(function (err, res) {
                if (err) throw err;

                done();
            });
    });

    it("should not fetch another companies docs", async () => {
        const res = await request(app)
            .get("/api/v1/company/1/company-docs")
            .set("Authorization", `Bearer ${token2}`)

            .expect(401);

        expect(res.body.message).toBe("Unauthorized");
    });

    it("should fetch companies docs for admin user", async () => {
        const res = await request(app)
            .get("/api/v1/company/1/company-docs")
            .set("Authorization", `Bearer ${token1}`)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.length).toBeGreaterThan(0);
    });
});

// get my company
// describe("GET api/v1/company/mine", () => {
//     // beforeEach(function (done) {
//     //     request(app)
//     //         .post("/api/v1/company")
//     //         .set("Authorization", `Bearer ${token2}`)
//     //         .send({
//     //             name: "x-company-1477",
//     //             email: "xcompany1177@gmail.com",
//     //             description: "x company the greatest",
//     //         })
//     //         .end(function (err, res) {
//     //             if (err) throw err;
//     //             company = res.body;
//     //             done();
//     //         });
//     // });

//     it("should fetch my company ", async () => {
//         const res = await request(app)
//             .get("/api/v1/company/mine")
//             .set("Authorization", `Bearer ${token3}`)
//             .expect("Content-Type", /json/)
//             .expect(200);

//         expect(res.body.name).toBe("x-company-113-test");
//     });
// });

// get by id tests
// describe("GET api/v1/company/:id", () => {
//     it("should fetch owner company", async () => {
//         const res = await request(app)
//             .get("/api/v1/company/1")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect("Content-Type", /json/)
//             .expect(200);

//         expect(res.body).toHaveProperty("name");
//     });

//     it("should return company to admin", async () => {
//         const res = await request(app)
//             .get("/api/v1/company/1")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect("Content-Type", /json/)
//             .expect(200);

//         expect(res.body).toHaveProperty("name");
//     });
// });

// patch tests
// describe("PATCH /api/v1/company/:id", () => {
//     it("should fail to update another persons company", async () => {
//         const res = await request(app)
//             .patch(`/api/v1/company/1`)
//             .set("Authorization", `Bearer ${token3}`)
//             .send({
//                 name: "x-company-faker",
//             })
//             .expect(401);
//     });

//     it("should update company name", async () => {
//         const res = await request(app)
//             .patch(`/api/v1/company/1`)
//             .set("Authorization", `Bearer ${token2}`)
//             .send({
//                 name: "x-company-updated",
//             })
//             .expect("Content-Type", /json/)
//             .expect(200);

//         expect(res.body.name).toBe("x-company-updated");
//     });

//     it("should fail to update duplicate company name", async () => {
//         const res = await request(app)
//             .patch(`/api/v1/company/1`)
//             .set("Authorization", `Bearer ${token2}`)
//             .send({
//                 name: "x-company-113-test",
//             })
//             .expect("Content-Type", /json/)
//             .expect(500);

//         console.log(res.body);
//         expect(res.body.message).toBe(
//             "Name x-company-updated is already taken"
//         );
//     });
// });

// delete tests

describe("DELETE api/v1/company/:id/company-docs", () => {
    let doc;
    beforeEach(function (done) {
        request(app)
            .post(`/api/v1/company/1/company-docs`)
            .set("Authorization", `Bearer ${token2}`)
            .send({
                document_type: "Joi.string().required()",
                document_number: "",
                description: "example desc",
                document_url: "https://exmapl.com",
            })
            .end(function (err, res) {
                if (err) throw err;
                doc = res.body;
                done();
            });
    });

    it("company should not delete  docs", async () => {
        const res = await request(app)
            .delete(`/api/v1/company/1/company-docs/${doc.id}`)
            .set("Authorization", `Bearer ${token2}`)
            .expect(401);
    });

    it("should delete company", async () => {
        const res = await request(app)
            .delete(`/api/v1/company/1/company-docs/${doc.id}`)
            .set("Authorization", `Bearer ${token1}`)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.id).toBe(doc.id);
    });
});
