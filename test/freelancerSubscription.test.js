const request = require("supertest");
const app = require("../src/app");
const async = require("async");

// let variables
let token1, token2, token3;
const expiry_date = new Date().toISOString();

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

describe("POST /api/v1/freelancerSubscription/", () => {
    it("Should fail to create a freelancerSubscription since user is not admin", async () => {
        await request(app)
            .post("/api/v1/freelancerSubscription/")
            .set("Authorization", `Bearer ${token3}`)
            .expect(401);
    });

    it("Should fail create a freelancerSubscription if date is not iso string || new Date", async () => {
        const res = await request(app)
            .post("/api/v1/freelancerSubscription/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                freelancer_id: 2,
                expiry_date: Date.now,
            })
            .expect(400);

        // expect(res.body.message).toContain("ValidationError");
    });

    it("Should create a freelancerSubscription", async () => {
        const res = await request(app)
            .post("/api/v1/freelancerSubscription/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                freelancer_id: 2,
                expiry_date,
            })
            .expect(200);

        expect(res.body.freelancer_id).toBe(2);
        expect(res.body.expiry_date).toBe(expiry_date);
    });

    it("Should fail create a freelancerSubscription if one exists", async () => {
        const res = await request(app)
            .post("/api/v1/freelancerSubscription/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                freelancer_id: 2,
                expiry_date,
            })
            .expect(500);

        expect(res.body.message).toContain("violates unique constraint");
    });
});

describe("GET /api/v1/freelancerSubscription/", () => {
    it("Should return an array of  freelancerSubscriptions", async () => {
        const res = await request(app)
            .get("/api/v1/freelancerSubscription/")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);

        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should fail to return array of freelancerSubscriptions if user is not admin", async () => {
        await request(app)
            .get("/api/v1/freelancerSubscription/")
            .set("Authorization", `Bearer ${token2}`)
            .expect(401);
    });
});

describe("GET /api/v1/freelancerSubscription/:id", () => {
    it("Should find a freelancerSubscription", async () => {
        const res = await request(app)
            .get("/api/v1/freelancerSubscription/2")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);
    });

    it("should fail to find a freelancerSubscription", async () => {
        await request(app)
            .get("/api/v1/freelancerSubscription/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });
});

// patch tests
describe("PATCH api/v1/freelancerSubscription/:id", () => {
    it("should fail to update another users freelancerSubscription profile", async () => {
        await request(app)
            .patch("/api/v1/freelancerSubscription/2")
            .set("Authorization", `Bearer ${token2}`)
            .expect(401);
    });

    it("should not add unknown fields to freelancerSubscription", async () => {
        await request(app)
            .patch("/api/v1/freelancerSubscription/2")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                freelancerSubscription_desc: "super freelancerSubscription 1",
            })
            .expect(400);
    });

    it("should update freelancerSubscription", async () => {
        const res = await request(app)
            .patch("/api/v1/freelancerSubscription/2")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                expiry_date,
                freelancer_id: 2,
            })
            .expect(200);
        expect(res.body.freelancer_id).toBe(2);
    });
});

describe("DELETE api/v1/freelancerSubscription/:id", () => {
    it("should fail to delete freelancerSubscription", async () => {
        await request(app)
            .delete("/api/v1/freelancerSubscription/2")
            .set("Authorization", `Bearer ${token2}`)
            .expect(401);
    });

    it("should delete freelancerSubscription", async () => {
        const res = await request(app)
            .delete("/api/v1/freelancerSubscription/2")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);
        expect(res.body.id).toBe(2);
    });
});
