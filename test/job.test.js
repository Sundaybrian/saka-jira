const request = require("supertest");
const app = require("../src/app");

// let variables
let token1, token2, token3;
const _date = new Date();
const start_date = new Date().toISOString();
const end_date = new Date(_date.setDate(13)).toISOString();

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

describe("POST /api/v1/job/", () => {
    it("admin should not create a job", async () => {
        await request(app)
            .post("/api/v1/job/")
            .set("Authorization", `Bearer ${token1}`)
            .expect(401);
    });

    it("Should fail create a job if fields are missing", async () => {
        const res = await request(app)
            .post("/api/v1/job/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                title: "Python developer",
            })
            .expect(400);

        // expect(res.body.message).toContain("ValidationError");
    });

    it("Should create a job", async () => {
        const res = await request(app)
            .post("/api/v1/job/")
            .set("Authorization", `Bearer ${token3}`)
            .send({
                title: "python developer wanted",
                description: "looking for a super developer ",
                main_skill: "python",
                industry_id: 1,
                budget_range_min: 25000,
                start_date,
                end_date,
                budget_range_max: 50000,
                latitude: 38.933354,
                longitude: -1.454646,
            })
            .expect(200);

        console.log(res.body);

        expect(res.body.title).toBe("python developer wanted");
        expect(res.body.hiring_manager_id).toBe(2);
        expect(res.body.end_date).toBe(end_date);
    });
});

// get all
describe("GET /api/v1/job/", () => {
    it("Should return an array of  jobs", async () => {
        const res = await request(app)
            .get("/api/v1/job/")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);

        expect(res.body.results.length).toBeGreaterThan(0);
    });
});

// get by id
describe("GET /api/v1/job/:id", () => {
    it("Should find a job", async () => {
        const res = await request(app)
            .get("/api/v1/job/2")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);

        expect(res.body.description).toBe("looking for a super developer 2");
    });

    it("should fail to find a job", async () => {
        await request(app)
            .get("/api/v1/job/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });
});

//patch tests
describe("PATCH api/v1/job/:id", () => {
    it("should fail to update another users job profile", async () => {
        await request(app)
            .patch("/api/v1/job/3")
            .set("Authorization", `Bearer ${token2}`)
            .expect(401);
    });

    it("should update job", async () => {
        const res = await request(app)
            .patch("/api/v1/job/2")
            .set("Authorization", `Bearer ${token3}`)
            .send({
                title: "updated job",
            })
            .expect(200);
        expect(res.body.title).toBe("updated job");
    });
});

describe("DELETE api/v1/job/:id", () => {
    it("should fail to delete job", async () => {
        await request(app)
            .delete("/api/v1/job/2")
            .set("Authorization", `Bearer ${token2}`)
            .expect(401);
    });

    it("should delete job", async () => {
        const res = await request(app)
            .delete("/api/v1/job/2")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);
        expect(res.body.id).toBe(2);
    });
});
