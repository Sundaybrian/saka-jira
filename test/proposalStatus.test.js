const request = require("supertest");
const app = require("../src/app");

// let variables
let token1, token2;

describe("POST /api/v1/proposalStatus/", () => {
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

    it("Should fail to create a proposalStatus with missing field", async () => {
        await request(app)
            .post("/api/v1/proposalStatus")
            .set("Authorization", `Bearer ${token1}`)
            .expect(400);
    });

    it("Should create a proposalStatus", async () => {
        const res = await request(app)
            .post("/api/v1/proposalStatus/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                proposal_status_name: "Plumbing",
            })
            .expect(200);

        expect(res.body.proposal_status_name).toBe("Plumbing");
    });

    // it("Should fail to create a proposalStatus for another proposalStatus", async () => {
    //     await request(app)
    //         .post("/api/v1/proposalStatus/2/proposalStatus")
    //         .set("Authorization", `Bearer ${token1}`)
    //         .send({
    //             proposal_status_name: "event proposalStatus 1",
    //             description: "proposalStatus for weddings",
    //         })
    //         .expect(401);
    // });
});

describe("GET /api/v1/proposalStatus/:id", () => {
    it("Should find a proposalStatus", async () => {
        await request(app).get("/api/v1/proposalStatus/1").expect(200);
    });

    it("should fail to find a proposalStatus", async () => {
        await request(app).get("/api/v1/proposalStatus/100").expect(404);
    });
});

describe("PATCH api/v1/proposalStatus/:id", () => {
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

    it("should fail to update a non existent proposalStatus", async () => {
        await request(app)
            .patch("/api/v1/proposalStatus/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should not add unknown fields to proposalStatus", async () => {
        await request(app)
            .patch("/api/v1/proposalStatus/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                proposalStatus_desc: "super proposalStatus 1",
            })
            .expect(400);
    });

    it("should update proposalStatus", async () => {
        const res = await request(app)
            .patch("/api/v1/proposalStatus/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                proposal_status_name: "super proposalStatus 1",
            })
            .expect(200);
        expect(res.body.proposal_status_name).toBe("super proposalStatus 1");

        expect(res.body.id).toBe(1);
    });
});

describe("DELETE api/v1/proposalStatus/:id", () => {
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

    it("should fail to delete proposalStatus", async () => {
        await request(app)
            .delete("/api/v1/proposalStatus/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should delete proposalStatus", async () => {
        const res = await request(app)
            .delete("/api/v1/proposalStatus/1")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);
        expect(res.body.id).toBe(1);
    });
});
