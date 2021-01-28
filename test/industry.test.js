const request = require("supertest");
const app = require("../src/app");

// let variables
let token1, token2;

describe("POST /api/v1/industry/", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "admin@admin.com",
                password: "12345678yh",
            })
            .end(function (err, res) {
                if (err) throw err;
                token1 = res.body.token;
                done();
            });
    });

    it("Should fail to create a industry with missing field", async () => {
        await request(app)
            .post("/api/v1/industry")
            .set("Authorization", `Bearer ${token1}`)
            .expect(400);
    });

    it("Should create a industry", async () => {
        const res = await request(app)
            .post("/api/v1/industry/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                industry_name: "Plumbing",
            })
            .expect(200);

        expect(res.body.industry_name).toBe("Plumbing");
    });

    // it("Should fail to create a industry for another industry", async () => {
    //     await request(app)
    //         .post("/api/v1/industry/2/industry")
    //         .set("Authorization", `Bearer ${token1}`)
    //         .send({
    //             industry_name: "event industry 1",
    //             description: "industry for weddings",
    //         })
    //         .expect(401);
    // });
});

describe("GET /api/v1/industry/:id", () => {
    it("Should find a industry", async () => {
        await request(app).get("/api/v1/industry/1").expect(200);
    });

    it("should fail to find a industry", async () => {
        await request(app).get("/api/v1/industry/100").expect(404);
    });
});

describe("PATCH api/v1/industry/:id", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "admin@admin.com",
                password: "12345678yh",
            })
            .end(function (err, res) {
                if (err) throw err;
                token1 = res.body.token;
                done();
            });
    });

    it("should fail to update a non existent industry", async () => {
        await request(app)
            .patch("/api/v1/industry/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should not add unknown fields to industry", async () => {
        await request(app)
            .patch("/api/v1/industry/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                industry_desc: "super industry 1",
            })
            .expect(400);
    });

    it("should update industry", async () => {
        const res = await request(app)
            .patch("/api/v1/industry/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                industry_name: "super industry 1",
            })
            .expect(200);
        expect(res.body.industry_name).toBe("super industry 1");

        expect(res.body.id).toBe(1);
    });
});

describe("DELETE api/v1/industry/:id", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "admin@admin.com",
                password: "12345678yh",
            })
            .end(function (err, res) {
                if (err) throw err;
                token1 = res.body.token;
                done();
            });
    });

    it("should fail to delete industry", async () => {
        await request(app)
            .delete("/api/v1/industry/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should delete industry", async () => {
        const res = await request(app)
            .delete("/api/v1/industry/1")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);
        expect(res.body.id).toBe(1);
    });
});
