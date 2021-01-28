const request = require("supertest");
const app = require("../src/app");

// let variables
let token1, token2;

describe("POST /api/v1/jobStatus/", () => {
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

    it("Should fail to create a jobStatus with missing field", async () => {
        await request(app)
            .post("/api/v1/jobStatus")
            .set("Authorization", `Bearer ${token1}`)
            .expect(400);
    });

    it("Should create a jobStatus", async () => {
        const res = await request(app)
            .post("/api/v1/jobStatus/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                job_status_name: "accepting quotes",
            })
            .expect(200);

        expect(res.body.job_status_name).toBe("accepting quotes");
    });

    // it("Should fail to create a jobStatus for another jobStatus", async () => {
    //     await request(app)
    //         .post("/api/v1/jobStatus/2/jobStatus")
    //         .set("Authorization", `Bearer ${token1}`)
    //         .send({
    //             job_status_name: "event jobStatus 1",
    //             description: "jobStatus for weddings",
    //         })
    //         .expect(401);
    // });
});

describe("GET /api/v1/jobStatus/:id", () => {
    it("Should find a jobStatus", async () => {
        await request(app).get("/api/v1/jobStatus/1").expect(200);
    });

    it("should fail to find a jobStatus", async () => {
        await request(app).get("/api/v1/jobStatus/100").expect(404);
    });
});

describe("PATCH api/v1/jobStatus/:id", () => {
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

    it("should fail to update a non existent jobStatus", async () => {
        await request(app)
            .patch("/api/v1/jobStatus/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should update jobStatus", async () => {
        const res = await request(app)
            .patch("/api/v1/jobStatus/1")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                job_status_name: "super jobStatus 1",
            })
            .expect(200);
        expect(res.body.job_status_name).toBe("super jobStatus 1");

        expect(res.body.id).toBe(1);
    });
});

describe("DELETE api/v1/jobStatus/:id", () => {
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

    it("should fail to delete jobStatus", async () => {
        await request(app)
            .delete("/api/v1/jobStatus/100")
            .set("Authorization", `Bearer ${token1}`)
            .expect(404);
    });

    it("should delete jobStatus", async () => {
        const res = await request(app)
            .delete("/api/v1/jobStatus/1")
            .set("Authorization", `Bearer ${token1}`)
            .expect(200);
        expect(res.body.id).toBe(1);
    });
});
