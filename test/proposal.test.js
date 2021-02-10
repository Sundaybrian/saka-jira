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

// send proposal
describe("POST /api/v1/proposal/", () => {
    it("admin should not create a proposal", async () => {
        await request(app)
            .post("/api/v1/proposal/")
            .set("Authorization", `Bearer ${token1}`)
            .expect(401);
    });

    it("Should fail to create a proposal if fields are missing", async () => {
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

// get freelancer proposals
describe("GET /api/v1/proposal/", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/proposal/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                job_id: 2,
            })
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it("Should return an array of  proposals", async () => {
        const res = await request(app)
            .get("/api/v1/proposal/freelancerProposals")
            .set("Authorization", `Bearer ${token2}`)
            .expect(200);

        expect(res.body.results.length).toBeGreaterThan(0);
    });
});

// get job proposals hiring Manager
describe("GET /api/v1/proposal/jobProposals/:job_id", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/proposal/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                job_id: 2,
            })
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it("Should not return proposals for another hiring manager", async () => {
        const res = await request(app)
            .get("/api/v1/proposal/jobProposals/2")
            .set("Authorization", `Bearer ${token2}`)
            .expect(401);
    });

    it("Should return an array of  proposals for hiring manager", async () => {
        const res = await request(app)
            .get("/api/v1/proposal/jobProposals/2")
            .set("Authorization", `Bearer ${token3}`)
            .expect(200);

        expect(res.body.results.length).toBeGreaterThan(0);
    });
});

// // get proposal history
// describe("GET /api/v1/proposal/:id/proposalHistory", () => {
//     beforeEach(function (done) {
//         request(app)
//             .post("api/v1/proposal/")
//             .set("Authorization", `Bearer ${token2}`)
//             .send({
//                 job_id: 2,
//             })
//             .end(function (err, res) {
//                 if (err) throw err;
//                 done();
//             });
//     });

//     // it("Should fail to find a proposal history", async () => {
//     //     const res = await request(app)
//     //         .get("/api/v1/proposal/100/proposalHistory")
//     //         .set("Authorization", `Bearer ${token3}`)
//     //         .expect(404);
//     // });

//     it("should find proposal and history", async () => {
//         const res = await request(app)
//             .get("/api/v1/proposal/1/proposalHistory")
//             .set("Authorization", `Bearer ${token2}`)
//             .expect(200);
//         console.log(res.body);
//         // expect(res.body.history.length).toBeGreaterThan(0);
//     });
// });

//patch tests FREELANCCER FEEDBACK
describe("PATCH api/v1/proposal/:id/freelancerFeedback", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/proposal/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                job_id: 3,
            })
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });
    it("should fail to update another users proposal profile", async () => {
        await request(app)
            .patch("/api/v1/proposal/1/freelancerFeedback")
            .set("Authorization", `Bearer ${token2}`)
            .expect(400);
    });

    it("should fail to update proposal feedback for another user", async () => {
        const res = await request(app)
            .patch("/api/v1/proposal/1/freelancerFeedback")
            .set("Authorization", `Bearer ${token3}`)
            .send({
                job_id: 2,
                freelancer_comment: "terrible",
                freelancer_rating: 1,
            })
            .expect(401);
    });
    it("should update proposal", async () => {
        const res = await request(app)
            .patch("/api/v1/proposal/1/freelancerFeedback")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                job_id: 2,
                freelancer_comment: "terrible",
                freelancer_rating: 1,
            })
            .expect(200);
    });

    it("should not find a proposal to update", async () => {
        const res = await request(app)
            .patch("/api/v1/proposal/100/freelancerFeedback")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                job_id: 2,
                freelancer_comment: "terrible",
                freelancer_rating: 1,
            })
            .expect(404);
    });
});

//patch tests client FEEDBACK/rating
describe("PATCH api/v1/proposal/:id/clientFeedback/:job_id", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/proposal/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                job_id: 2,
            })
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it("should fail to update another clients proposal profile", async () => {
        await request(app)
            .patch("/api/v1/proposal/1/clientFeedback/2")
            .set("Authorization", `Bearer ${token2}`)
            .expect(401);
    });

    it("should fail to update proposal feedback for another user", async () => {
        const res = await request(app)
            .patch("/api/v1/proposal/1/clientFeedback/2")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                current_proposal_status_id: 4,
                client_comment: "terrible",
                client_rating: 1,
            })
            .expect(401);
    });
    it("should update proposal", async () => {
        const res = await request(app)
            .patch("/api/v1/proposal/1/clientFeedback/2")
            .set("Authorization", `Bearer ${token3}`)
            .send({
                current_proposal_status_id: 4,
                client_comment: "nonsense",
                client_rating: 1,
            })
            .expect(200);
    });

    // it("should not find a proposal to update", async () => {
    //     const res = await request(app)
    //         .patch("/api/v1/proposal/2/clientFeedback")
    //         .set("Authorization", `Bearer ${token2}`)
    //         .send({
    //             job_id: 2,
    //             freelancer_comment: "terrible",
    //             freelancer_rating: 1,
    //         })
    //         .expect(404);
    // });
});

// withdraw proposal
describe("DELETE api/v1/proposal/:id/withdrawProposal", () => {
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/proposal/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                job_id: 2,
            })
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it("should fail to delete proposal", async () => {
        await request(app)
            .delete("/api/v1/proposal/1/withdrawProposal")
            .set("Authorization", `Bearer ${token3}`)
            .expect(401);
    });

    it("should delete proposal", async () => {
        const res = await request(app)
            .delete("/api/v1/proposal/1/withdrawProposal")
            .set("Authorization", `Bearer ${token2}`)
            .expect(200);
        expect(res.body.id).toBe(1);
    });
});

// deleteProposal client
describe("DELETE api/v1/proposal/:id/rejectProposal/:job_id", () => {
    let id;
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/proposal/")
            .set("Authorization", `Bearer ${token2}`)
            .send({
                job_id: 3,
            })
            .end(function (err, res) {
                if (err) throw err;
                id = res.body.id;
                console.log(res.body, "********** here");
                done();
            });
    });

    it("should return 401 to delete proposal", async () => {
        await request(app)
            .delete("/api/v1/proposal/1/rejectProposal/3")
            .set("Authorization", `Bearer ${token2}`)
            .expect(401);
    });

    it("should delete proposal", async () => {
        const res = await request(app)
            .delete(`/api/v1/proposal/${id}/rejectProposal/3`)
            .set("Authorization", `Bearer ${token3}`)
            .expect(200);
        expect(res.body.id).toBe(id);
    });
});
