const request = require("supertest");
const app = require("../src/app");

// let variables
let token1, token2;

describe("POST /api/v1/skill/", () => {
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

    it("Should fail to create a skill with missing field", async () => {
        await request(app)
            .post("/api/v1/skill")
            .set("Authorization", `Bearer ${token1}`)
            .expect(400);
    });

    it("Should create a skill", async () => {
        const res = await request(app)
            .post("/api/v1/skill/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                skill_name: "Plumbing",
            })
            .expect(200);

        expect(res.body.skill_name).toBe("Plumbing");
    });

    // it("Should fail to create a skill for another skill", async () => {
    //     await request(app)
    //         .post("/api/v1/skill/2/skill")
    //         .set("Authorization", `Bearer ${token1}`)
    //         .send({
    //             skill_name: "event skill 1",
    //             description: "skill for weddings",
    //         })
    //         .expect(401);
    // });
});

describe("GET /api/v1/skill/:id", () => {
    it("Should find a skill", async () => {
        await request(app).get("/api/v1/skill/1").expect(200);
    });

    it("should fail to find a skill", async () => {
        await request(app).get("/api/v1/skill/100").expect(404);
    });
});

describe("PATCH api/v1/skill/:id", () => {
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

    it("should fail to update a non existent skill", async () => {
        await request(app)
            .patch("/api/v1/skill/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should not add unknown fields to skill", async () => {
        await request(app)
            .patch("/api/v1/skill/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                skill_desc: "super skill 1",
            })
            .expect(400);
    });

    it("should update skill", async () => {
        const res = await request(app)
            .patch("/api/v1/skill/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                skill_name: "super skill 1",
            })
            .expect(200);
        expect(res.body.skill_name).toBe("super skill 1");

        expect(res.body.id).toBe(1);
    });
});

describe("DELETE api/v1/skill/:id", () => {
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

    it("should fail to delete skill", async () => {
        await request(app)
            .delete("/api/v1/skill/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should delete skill", async () => {
        const res = await request(app)
            .delete("/api/v1/skill/1")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);
        expect(res.body.id).toBe(1);
    });
});
