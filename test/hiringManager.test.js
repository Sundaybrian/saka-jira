const request = require("supertest");
const app = require("../src/app");

// let variables
let token1, token2, token3;

beforeAll(function (done) {
    request(app)
        .post("/api/v1/accounts/login")
        .send({
            email: "diff@owner.com",
            password: "12345678yh",
        })
        .end(function (err, res) {
            if (err) throw err;
            token2 = res.body.token;
            done();
        });
});

describe("GET /api/v1/hiringManager/:id", () => {
    it("should fail to find a hiringManager", async () => {
        await request(app).get("/api/v1/hiringManager/100").expect(404);
    });

    it("Should find a hiringManager", async () => {
        const res = await request(app)
            .get("/api/v1/hiringManager/1")
            .expect(200);

        expect(res.body.latitude).toBe(0);
        expect(res.body.user_id).toBe(1);
    });
});

describe("PATCH api/v1/hiringManager/:id", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "sunday@owner.com",
                password: "12345678yh",
            })
            .end(function (err, res) {
                if (err) throw err;
                token1 = res.body.token;
                done();
            });
    });

    it("should fail to update another users hiringManager profile", async () => {
        await request(app)
            .patch("/api/v1/hiringManager/2")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                latitude: 67.902,
            })
            .expect(401);
    });

    it("should update your hiringManager profile", async () => {
        const res = await request(app)
            .patch("/api/v1/hiringManager/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                longitude: -2.66,
            })
            .expect(200);
        expect(res.body.longitude).toBe(-2.66);
        expect(res.body.id).toBe(1);
    });

    it("should not add unknown fields to hiringManager", async () => {
        await request(app)
            .patch("/api/v1/hiringManager/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                hiringManager_desc: "super hiringManager 1",
            })
            .expect(400);
    });
});

describe("DELETE api/v1/hiringManager/:id", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "admin@admin.com",
                password: "12345678yh",
            })
            .end(function (err, res) {
                if (err) throw err;
                token3 = res.body.token;
                done();
            });
    });

    it("should fail to delete hiringManager", async () => {
        await request(app)
            .delete("/api/v1/hiringManager/1")
            .set("Authorization", `Bearer ${token2}`)
            .expect(401);
    });

    it("should delete hiringManager", async () => {
        const res = await request(app)
            .delete("/api/v1/hiringManager/1")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);
        expect(res.body.id).toBe(1);
    });

    it("should delete own hiringManager profile", async () => {
        const res = await request(app)
            .delete("/api/v1/hiringManager/2")
            .set("Authorization", `Bearer ${token2}`)
            .expect(200);
        expect(res.body.id).toBe(2);
    });
});
