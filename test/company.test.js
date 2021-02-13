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
describe("POST /api/v1/company/", () => {
    it("should fail to create a company missing description", async () => {
        const res = await request(app)
            .post("/api/v1/company")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                name: "x-company",
                email: "xcompany@gmail.com",
            })
            .expect("Content-Type", /json/)
            .expect(400);
    });

    it("should create a company", async () => {
        const res = await request(app)
            .post("/api/v1/company")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                name: "x-company",
                email: "xcompany@gmail.com",
                description: "x company the greatest",
            })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.name).toBe("x-company");
    });
});

// get tests
describe("GET api/v1/company", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/company")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                name: "x-company-11",
                email: "xcompany11@gmail.com",
                description: "x company the greatest",
            })
            .end(function (err, res) {
                if (err) throw err;
                company = res.body;
                done();
            });
    });
    it("should not fetch companies for a non admin user", async () => {
        const res = await request(app)
            .get("/api/v1/company/")
            .set("Authorization", `Bearer ${token2}`)
            .expect("Content-Type", /json/)
            .expect(401);

        expect(res.body.message).toBe("Unauthorized");
    });

    it("should fetch companies for admin user", async () => {
        const res = await request(app)
            .get("/api/v1/company/")
            .set("Authorization", `Bearer ${token1}`)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.results.length).toBeGreaterThan(0);
    });
});

// get by id tests
describe("GET api/v1/company/:id", () => {
    it("should fetch owner company", async () => {
        const res = await request(app)
            .get("/api/v1/company/1")
            .set("Authorization", `Bearer ${token1}`)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body).toHaveProperty("name");
    });

    it("should return company to admin", async () => {
        const res = await request(app)
            .get("/api/v1/company/1")
            .set("Authorization", `Bearer ${token1}`)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body).toHaveProperty("name");
    });
});

// patch tests
describe("PATCH /api/v1/company/:id", () => {
    it("should fail to update another persons company", async () => {
        const res = await request(app)
            .patch(`/api/v1/company/1`)
            .set("Authorization", `Bearer ${token3}`)
            .send({
                name: "x-company-faker",
            })
            .expect(401);
    });

    it("should update company name", async () => {
        const res = await request(app)
            .patch(`/api/v1/company/1`)
            .set("Authorization", `Bearer ${token2}`)
            .send({
                name: "x-company-updated",
            })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.name).toBe("x-company-updated");
    });

    it("should fail to update duplicate company name", async () => {
        const res = await request(app)
            .patch(`/api/v1/company/1`)
            .set("Authorization", `Bearer ${token2}`)
            .send({
                name: "x-company-113-test",
            })
            .expect("Content-Type", /json/)
            .expect(500);

        console.log(res.body);
        expect(res.body.message).toBe(
            "Name x-company-updated is already taken"
        );
    });
});

// delete tests

describe("DELETE api/v1/company/:id", () => {
    it("owner should not delete anothers company", async () => {
        const res = await request(app)
            .delete("/api/v1/company/1")
            .set("Authorization", `Bearer ${token3}`)
            .expect("Content-Type", /json/)
            .expect(401);
    });

    it("should delete company", async () => {
        const res = await request(app)
            .delete("/api/v1/company/1")
            .set("Authorization", `Bearer ${token2}`)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.id).toBe(1);
    });
});
