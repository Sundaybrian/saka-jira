const request = require("supertest");
const app = require("../src/app");

// let variables
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

describe("POST /api/v1/freelancer/:id/customSkills/", () => {
    it("Should fail to create a freelancer customSkills for another user", async () => {
        await request(app)
            .post("/api/v1/freelancer/1/customSkills/")
            .set("Authorization", `Bearer ${token3}`)
            .send({
                skill_name: "hater skill",
            })
            .expect(401);
    });

    it("Should fail to create freelancer customSkills if missing fields", async () => {
        const res = await request(app)
            .post("/api/v1/freelancer/1/customSkills/")
            .set("Authorization", `Bearer ${token2}`)
            .expect(400);

        // expect(res.body.message).toContain("ValidationError");
    });

    it("Should insert a freelancer custom skill", async () => {
        const res = await request(app)
            .post("/api/v1/freelancer/1/customSkills/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                skill_name: "kufua nguo",
            })
            .expect(200);

        expect(res.body.freelancer_id).toBe(1);
        expect(res.body.skill_name).toBe("kufua nguo");
    });
});

// get my skills

describe("GET /api/v1/freelancer/:id/customSkills/", () => {
    it("Should return an array of  freelancers customSkills", async () => {
        const res = await request(app)
            .get("/api/v1/freelancer/1/customSkills/")
            .set("Authorization", `Bearer ${token2}`)
            .expect(200);

        expect(res.body).toBeTruthy();
        // expect(res.body.skills[0].freelancer_id).toBe(1);
        // expect(res.body.skills[0].skill_name).toBeTruthy();
    });
});

describe("DELETE api/v1/freelancer/:id/customSkills/:id", () => {
    it("should fail to delete freelancer skill", async () => {
        await request(app)
            .delete("/api/v1/freelancer/1/customSkills/1")
            .set("Authorization", `Bearer ${token3}`)
            .expect(401);
    });

    it("should delete freelancer", async () => {
        const res = await request(app)
            .delete("/api/v1/freelancer/1/customSkills/1")
            .set("Authorization", `Bearer ${token2}`)
            .expect(200);
        expect(res.body.id).toBe(1);
    });
});
