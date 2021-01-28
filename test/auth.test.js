const request = require("supertest");
const app = require("../src/app");
const Role = require("../src/constants/roles");

describe("POST /api/v1/accounts/login", () => {
    it("Should login user", async () => {
        const res = await request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "sunday@owner.com",
                password: "12345678yh",
            })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.user.first_name).toEqual("sunday");
    });

    it("Should not login user with wrong password", async () => {
        await request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "sunday@owner.com",
                password: "sunday omwami",
            })
            .expect("Content-Type", /json/)
            .expect(500);
    });

    it("Should fail to login for a non existenst user", async () => {
        await request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "fakeuser@gmail.com",
                password: "eveniamfake",
            })
            .expect(500);
    });
});

describe("POST fetch accounts", () => {
    let token;
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "admin@admin.com",
                password: "12345678yh",
            })
            .end(function (err, res) {
                if (err) throw err;
                token = res.body.token;
                done();
            });
    });

    it("Should return an array of users", async () => {
        const res = await request(app)
            .get("/api/v1/accounts")
            .set("Authorization", `Bearer ${token}`)
            .send()
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("PUT/GET /api/v1/accounts/:id fetch account by id", () => {
    let token;
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "admin@admin.com",
                password: "12345678yh",
            })
            .end(function (err, res) {
                if (err) throw err;
                token = res.body.token;
                done();
            });
    });

    it("Should return the account of the user", async () => {
        const res = await request(app)
            .get("/api/v1/accounts/1")
            .set("Authorization", `Bearer ${token}`)
            .send()
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.id).toEqual(1);
        expect(res.body.first_name).toEqual("sunday");
    });

    it("Should not update the account of the admin", async () => {
        const res = await request(app)
            .patch("/api/v1/accounts/3")
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "sunday@owner.com",
            })
            .expect("Content-Type", /json/)
            .expect(500);

        expect(res.body.message).toEqual(
            "Email sunday@owner.com is already taken"
        );
    });

    it("admin Should update the account of the staff", async () => {
        const res = await request(app)
            .patch("/api/v1/accounts/2")
            .set("Authorization", `Bearer ${token}`)
            .send({
                first_name: "new user name",
            })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.first_name).toEqual("new user name");
    });
});

describe("POST /api/v1/accounts/create-staff ", () => {
    let token;
    beforeEach(function (done) {
        request(app)
            .post("/api/v1/accounts/login")
            .send({
                email: "admin@admin.com",
                password: "12345678yh",
            })
            .end(function (err, res) {
                if (err) throw err;
                token = res.body.token;
                done();
            });
    });

    it("should fail to create a user with missing fields", async () => {
        await request(app)
            .post("/api/v1/accounts/create-staff")
            .set("Authorization", `Bearer ${token}`)
            .send({
                first_name: "test",
                last_name: "user",
                phone_number: "0778986544",
                role: Role.staff,
            })
            .expect("Content-Type", /json/)
            .expect(400);
    });

    it("should fail to signup user with existing email", async () => {
        const res = await request(app)
            .post("/api/v1/accounts/create-staff")
            .set("Authorization", `Bearer ${token}`)
            .send({
                first_name: "test",
                last_name: "user",
                phone_number: "0778986544",
                email: "sunday@owner.com",
                password: "localtestuser",
            })
            .expect("Content-Type", /json/)
            .expect(400);

        expect(res.body.message).toContain("Email");
    });

    it("staff should create a new user", async () => {
        const res = await request(app)
            .post("/api/v1/accounts/create-staff")
            .set("Authorization", `Bearer ${token}`)
            .send({
                first_name: "test",
                last_name: "staff",
                phone_number: "0718986544",
                email: "staffwasunday@staff.com",
                password: "localtestuser",
            })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.email).toEqual("staffwasunday@staff.com");
    });
});
