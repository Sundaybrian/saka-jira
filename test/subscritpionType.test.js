const request = require("supertest");
const app = require("../src/app");
const Role = require("../src/constants/roles");

// let variables
let token1, token2;

describe("POST /api/v1/subscriptionType/", () => {
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

    it("Should fail to create a subscriptionType with missing field", async () => {
        await request(app)
            .post("/api/v1/subscriptionType")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                subscription_type_name: "event subscriptionType",
            })
            .expect(400);
    });

    it("Should create a subscriptionType", async () => {
        const res = await request(app)
            .post("/api/v1/subscriptionType/")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                subscription_type_name: "Day",
                amount: 20,
                subscription_duration: "Day",
                duration_in_days: 1,
            })
            .expect(200);

        expect(res.body.subscription_type_name).toBe("Day");
    });

    // it("Should fail to create a subscriptionType for another subscriptionType", async () => {
    //     await request(app)
    //         .post("/api/v1/subscriptionType/2/subscriptionType")
    //         .set("Authorization", `Bearer ${token1}`)
    //         .send({
    //             name: "event subscriptionType 1",
    //             description: "subscriptionType for weddings",
    //         })
    //         .expect(401);
    // });
});

// describe("GET /api/v1/subscriptionType/:id/subscriptionType", () => {
//     it("Should return subscriptionType subscriptionType", async () => {
//         await request(app)
//             .get("/api/v1/subscriptionType/1/subscriptionType")
//             .expect(200);
//     });
// });

// describe("GET api/v1/subscriptionType/:id/subscriptionType/:id", () => {
//     it("should fail to find a subscriptionType", async () => {
//         await request(app)
//             .get("/api/v1/subscriptionType/1/subscriptionType/10")
//             .expect(404);
//     });

//     it("should find a subscriptionType", async () => {
//         const res = await request(app)
//             .get("/api/v1/subscriptionType/1/subscriptionType/1")
//             .expect(200);
//         expect(res.body.name).toBe("super subscriptionType");
//     });
// });

// describe("PATCH api/v1/subscriptionType/:id/subscriptionType/:id", () => {
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

//     it("should fail to update subscriptionType for another subscriptionType", async () => {
//         await request(app)
//             .patch("/api/v1/subscriptionType/2/subscriptionType/2")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(401);
//     });

//     it("should update subscriptionType", async () => {
//         const res = await request(app)
//             .patch("/api/v1/subscriptionType/1/subscriptionType/1")
//             .set("Authorization", `Bearer ${token1}`)
//             .send({
//                 name: "super subscriptionType 1",
//             })
//             .expect(200);
//         expect(res.body.name).toBe("super subscriptionType 1");

//         expect(res.body.id).toBe(1);
//     });
// });

// describe("DELETE api/v1/subscriptionType/:id/subscriptionType/:id", () => {
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

//     it("should fail to delete another comapanys subscriptionType", async () => {
//         await request(app)
//             .delete("/api/v1/subscriptionType/2/subscriptionType/2")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(401);
//     });

//     it("should delete subscriptionType", async () => {
//         const res = await request(app)
//             .delete("/api/v1/subscriptionType/1/subscriptionType/1")
//             .set("Authorization", `Bearer ${token1}`)
//             .expect(200);
//         expect(res.body.id).toBe(1);
//     });
// });
