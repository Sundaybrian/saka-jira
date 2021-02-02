const request = require("supertest");
const app = require("../src/app");
const async = require("async");

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

describe("POST /api/v1/freelancer/:id/skills/", () => {
    it("Should fail to create a freelancer skills for another user", async () => {
        await request(app)
            .post("/api/v1/freelancer/1/skills/")
            .set("Authorization", `Bearer ${token3}`)
            .send({
                skill_id:1
            })
            .expect(401);
    });

    it("Should fail create add freelancer skills if missing fields", async () => {
        const res = await request(app)
            .post("/api/v1/freelancer/1/skills/")
            .set("Authorization", `Bearer ${token2}`)
            .expect(400);

        // expect(res.body.message).toContain("ValidationError");
    });

    it("Should insert a freelancer skill", async () => {
        const res = await request(app)
            .post("/api/v1/freelancer/1/skills/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                skill_id:1
            })
            .expect(200);

        expect(res.body.freelancer_id).toBe(1);
        expect(res.body.skill_id).toBe(1);
    });

    it("Should fail to insert duplicate skills", async () => {
        const res = await request(app)
            .post("/api/v1/freelancer/1/skills/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                skill_id:1
                
            })
            .expect(500);

        expect(res.body.message).toContain("violates unique constraint");
    });
});

// get my skills

describe("GET /api/v1/freelancer/:id/skills/", () => {
    it("Should return an array of  freelancers skills", async () => {
        const res = await request(app)
            .get("/api/v1/freelancer/1/skills/")
            .set("Authorization", `Bearer ${token2}`)
            .expect(200);

        expect(res.body.skills.length).toBeGreaterThan(0);
        expect(res.body.skills[0].freelancer_id).toBe(1);
        expect(res.body.skills[0].skill_name).toBeTruthy()

    });

    it("should fail to return array of freelancers:id/skills/ if user is not admin", async () => {
        await request(app)
            .get("/api/v1/freelancer/1/skills/")
            .set("Authorization", `Bearer ${token3}`)
            .expect(401);
    });
});



// describe("GET /api/v1/freelancer/:id/skills/:id", () => {
//     it("should fail to return another users freelancer":id/skills/, async () => {
//         await request(app)
//             .get("/api/v1/freelancer/:id/skills/2")
//             .set("Authorization", `Bearer ${token3}`)
//             .expect(401);
//     });
//     it("Should find a freelancer":id/skills/, async () => {
//         const res = await request(app)
//             .get("/api/v1/freelancer/:id/skills/2")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(200);
//     });

//     it("should fail to find a freelancer":id/skills/, async () => {
//         await request(app)
//             .get("/api/v1/freelancer/:id/skills/100")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(404);
//     });
// });

// // patch tests
// describe("PATCH api/v1/freelancer/:id/skills/:id", () => {
//     it("should fail to update another users freelancer :id/skills/profile", async () => {
//         await request(app)
//             .patch("/api/v1/freelancer/:id/skills/2")
//             .set("Authorization", `Bearer ${token2}`)
//             .expect(401);
//     });

//     it("should not add unknown fields to freelancer", async () => {
//         await request(app)
//             .patch("/api/v1/freelancer/:id/skills/2")
//             .set("Authorization", `Bearer ${token1}`)
//             .send({
//                 freelancer_:id/skills/desc: "super freelancer :id/skills/1",
//             })
//             .expect(400);
//     });

//     it("should update freelancer":id/skills/, async () => {
//         const res = await request(app)
//             .patch("/api/v1/freelancer/:id/skills/2")
//             .set("Authorization", `Bearer ${token1}`)
//             .send({
//                 ,
//                 freelancer_id: 2,
//             })
//             .expect(200);
//         expect(res.body.freelancer_id).toBe(2);
//     });
// });

// describe("DELETE api/v1/freelancer/:id/skills/:id", () => {
//     it("should fail to delete freelancer",async () => {
//         await request(app)
//             .delete("/api/v1/freelancer/:id/skills/2")
//             .set("Authorization", `Bearer ${token2}`)
//             .expect(401);
//     });

//     it("should delete freelancer":id/skills/, async () => {
//         const res = await request(app)
//             .delete("/api/v1/freelancer/:id/skills/2")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(200);
//         expect(res.body.id).toBe(2);
//     });
// });
