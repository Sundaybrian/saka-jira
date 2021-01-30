const request = require("supertest");
const app = require("../src/app");

// let variables
let token1;

describe("POST /api/v1/freelancer/", () => {
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

    it("Should fail to create a freelancer with missing field", async () => {
        await request(app)
            .post("/api/v1/freelancer/")
            .set("Authorization", `Bearer ${token1}`)
            .expect(400);
    });

    it("Should create a freelancer profile", async () => {
        const res = await request(app)
            .post("/api/v1/freelancer/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                industry_id: 1,
                latitude: 38.56578,
                longitude: -1.5565,
            })
            .expect(200);

        expect(res.body.industry_id).toBe(1);
        expect(res.body.latitude).toBe(38.56578);
    });
});

describe("GET /api/v1/freelancer/:id", () => {
    it("Should find a freelancer", async () => {
        const res = await request(app).get("/api/v1/freelancer/1").expect(200);

        expect(res.body.industry.industry_id).toBe(1);
        expect(res.body.latitude).toBe(0);
    });

    it("should fail to find a freelancer", async () => {
        await request(app).get("/api/v1/freelancer/100").expect(404);
    });
});

// describe("PATCH api/v1/freelancer/:id", () => {
//     beforeEach(function (done) {
//         request(app)
//             .post("/api/v1/accounts/login")
//             .send({
//                 email: "sunday@owner.com",
//                 password: "12345678yh",
//             })
//             .end(function (err, res) {
//                 if (err) throw err;
//                 token1 = res.body.token;
//                 done();
//             });
//     });

//     it("should fail to update a non existent freelancer", async () => {
//         await request(app)
//             .patch("/api/v1/freelancer/100")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(404);
//     });

//     it("should not add unknown fields to freelancer", async () => {
//         await request(app)
//             .patch("/api/v1/freelancer/1")
//             .set("Authorization", `Bearer ${token1}`)
//             .send({
//                 freelancer_desc: "super freelancer 1",
//             })
//             .expect(400);
//     });

//     it("should update freelancer", async () => {
//         const res = await request(app)
//             .patch("/api/v1/freelancer/1")
//             .set("Authorization", `Bearer ${token1}`)
//             .send({
//                 longitude: -2.66,
//             })
//             .expect(200);
//         expect(res.body.longitude).toBe(-2.66);
//         expect(res.body.id).toBe(1);
//     });
// });

// describe("DELETE api/v1/freelancer/:id", () => {
//     beforeEach(function (done) {
//         request(app)
//             .post("/api/v1/accounts/login")
//             .send({
//                 email: "admin@admin.com",
//                 password: "12345678yh",
//             })
//             .end(function (err, res) {
//                 if (err) throw err;
//                 token1 = res.body.token;
//                 done();
//             });
//     });

//     it("should fail to delete freelancer", async () => {
//         await request(app)
//             .delete("/api/v1/freelancer/100")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(404);
//     });

//     it("should delete freelancer", async () => {
//         const res = await request(app)
//             .delete("/api/v1/freelancer/1")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(200);
//         expect(res.body.id).toBe(1);
//     });
// });
