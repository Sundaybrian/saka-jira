const request = require("supertest");
const app = require("../src/app");

// let variables
let token1, token2;

describe("POST /api/v1/paymentType/", () => {
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

    it("Should fail to create a paymentType with missing field", async () => {
        await request(app)
            .post("/api/v1/paymentType")
            .set("Authorization", `Bearer ${token1}`)
            .expect(400);
    });

    it("Should create a paymentType", async () => {
        const res = await request(app)
            .post("/api/v1/paymentType/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                payment_type_name: "PerHour",
            })
            .expect(200);

        expect(res.body.payment_type_name).toBe("PerHour");
    });

    // it("Should fail to create a paymentType for another paymentType", async () => {
    //     await request(app)
    //         .post("/api/v1/paymentType/2/paymentType")
    //         .set("Authorization", `Bearer ${token1}`)
    //         .send({
    //             payment_type_name: "event paymentType 1",
    //             description: "paymentType for weddings",
    //         })
    //         .expect(401);
    // });
});

describe("GET /api/v1/paymentType/:id", () => {
    it("Should find a paymentType", async () => {
        await request(app).get("/api/v1/paymentType/1").expect(200);
    });

    it("should fail to find a paymentType", async () => {
        await request(app).get("/api/v1/paymentType/100").expect(404);
    });
});

describe("PATCH api/v1/paymentType/:id", () => {
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

    it("should fail to update a non existent paymentType", async () => {
        await request(app)
            .patch("/api/v1/paymentType/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should not add unknown fields to paymentType", async () => {
        await request(app)
            .patch("/api/v1/paymentType/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                paymentType_desc: "super paymentType 1",
            })
            .expect(400);
    });

    it("should update paymentType", async () => {
        const res = await request(app)
            .patch("/api/v1/paymentType/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                payment_type_name: "PerMonth",
            })
            .expect(200);
        expect(res.body.payment_type_name).toBe("PerMonth");

        expect(res.body.id).toBe(1);
    });
});

describe("DELETE api/v1/paymentType/:id", () => {
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

    it("should fail to delete paymentType", async () => {
        await request(app)
            .delete("/api/v1/paymentType/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should delete paymentType", async () => {
        const res = await request(app)
            .delete("/api/v1/paymentType/1")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);
        expect(res.body.id).toBe(1);
    });
});
