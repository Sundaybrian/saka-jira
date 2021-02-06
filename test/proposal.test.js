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

// send proposal
describe("POST /api/v1/proposal/", () => {
    it("admin should not create a proposal", async () => {
        await request(app)
            .post("/api/v1/proposal/")
            .set("Authorization", `Bearer ${token1}`)
            .expect(401);
    });

    it("Should fail create a proposal if fields are missing", async () => {
        const res = await request(app)
            .post("/api/v1/proposal/")
            .set("Authorization", `Bearer ${token2}`)
            .expect(400);
    });

    it("Should create a proposal", async () => {
        const res = await request(app)
            .post("/api/v1/proposal/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                job_id: 2,
            })
            .expect(200);

        console.log(res.body);

        expect(res.body.job_id).toBe(2);
        expect(res.body.freelancer_id).toBe(1);
        expect(res.body.current_proposal_status_id).toBe(1);
    });
});

// get all
// describe("GET /api/v1/proposal/", () => {
//     it("Should return an array of  proposals", async () => {
//         const res = await request(app)
//             .get("/api/v1/proposal/")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(200);

//         expect(res.body.results.length).toBeGreaterThan(0);
//     });
// });

// // get by id
// describe("GET /api/v1/proposal/:id", () => {
//     it("Should find a proposal", async () => {
//         const res = await request(app)
//             .get("/api/v1/proposal/2")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(200);

//         expect(res.body.description).toBe("looking for a super developer 2");
//     });

//     it("should fail to find a proposal", async () => {
//         await request(app)
//             .get("/api/v1/proposal/100")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(404);
//     });
// });

// //patch tests
// describe("PATCH api/v1/proposal/:id", () => {
//     it("should fail to update another users proposal profile", async () => {
//         await request(app)
//             .patch("/api/v1/proposal/3")
//             .set("Authorization", `Bearer ${token2}`)
//             .expect(401);
//     });

//     it("should update proposal", async () => {
//         const res = await request(app)
//             .patch("/api/v1/proposal/2")
//             .set("Authorization", `Bearer ${token3}`)
//             .send({
//                 title: "updated proposal",
//             })
//             .expect(200);
//         expect(res.body.title).toBe("updated proposal");
//     });
// });

// describe("DELETE api/v1/proposal/:id", () => {
//     it("should fail to delete proposal", async () => {
//         await request(app)
//             .delete("/api/v1/proposal/2")
//             .set("Authorization", `Bearer ${token2}`)
//             .expect(401);
//     });

//     it("should delete proposal", async () => {
//         const res = await request(app)
//             .delete("/api/v1/proposal/2")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(200);
//         expect(res.body.id).toBe(2);
//     });
// });
