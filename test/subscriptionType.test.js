const request = require("supertest");
const app = require("../src/app");
const Role = require("../src/constants/roles");

// let variables
let token1, token2;

describe("POST /api/v1/subscriptionType/", () => {
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

    it("Should fail to create a subscriptionType with missing field", async () => {
        await request(app)
            .post("/api/v1/subscriptionType")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                name: "event subscriptionType",
            })
            .expect(400);
    });

    it("Should create a subscriptionType", async () => {
        const res = await request(app)
            .post("/api/v1/subscriptionType/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                name: "Day",
                amount: 20,
                subscription_duration: "Day",
                duration_in_days: 1,
            })
            .expect(200);

        expect(res.body.name).toBe("Day");
    });

    // it("Should fail to create a subscriptionType for another subscriptionType", async () => {
    //     await request(app)
    //         .post("/api/v1/subscriptionType/2/subscriptionType")
    //         .set("Authorization", `Bearer ${token1}`)
    //         .send({
    //             name: "event subscriptionType 1",
    //             description: "subscriptionType for weddings",
    //         })
    //         .expect(401);
    // });
});

describe("GET /api/v1/subscriptionType/:id", () => {
    it("Should fail to find subscriptionType", async () => {
        await request(app).get("/api/v1/subscriptionType/1").expect(200);
    });

    it("should fail to find a subscriptionType", async () => {
        await request(app).get("/api/v1/subscriptionType/100").expect(404);
    });
});

describe("PATCH api/v1/subscriptionType/:id", () => {
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

    it("should fail to update a non existent subscriptionType", async () => {
        await request(app)
            .patch("/api/v1/subscriptionType/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should update subscriptionType", async () => {
        const res = await request(app)
            .patch("/api/v1/subscriptionType/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                name: "super subscriptionType 1",
            })
            .expect(200);
        expect(res.body.name).toBe("super subscriptionType 1");

        expect(res.body.id).toBe(1);
    });
});

describe("DELETE api/v1/subscriptionType/:id", () => {
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

    it("should fail to delete subscriptionType", async () => {
        await request(app)
            .delete("/api/v1/subscriptionType/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should delete subscriptionType", async () => {
        const res = await request(app)
            .delete("/api/v1/subscriptionType/1")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);
        expect(res.body.id).toBe(1);
    });
});
