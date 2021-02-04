const MailerService = require("./email.service");
const crypto = require("crypto");
const jwt = require("../utils/jwt");
const bcrypt = require("bcrypt");
const User = require("../models/User/User.Model");
const tableNames = require("../constants/tableNames");

class AuthService {
    constructor() {}

    static async login(email, password) {
        const account = await this.getAccount({ email });
        if (
            !account ||
            // !account.isVerified ||
            !(await bcrypt.compare(password, account.password))
        ) {
            const error = new Error("Email or password is incorrect");
            throw error;
        }

        const loggedIn = await account
            .$query()
            .modify("defaultSelectsWithoutPass")
            .withGraphFetched(
                `[freelancer(defaultSelects), hiringManager(defaultSelects)]`
            )
            .first();

        const token = await jwt.sign(loggedIn.toJSON());

        return {
            user: loggedIn,
            token,
        };
    }

    static async register(userInput, origin) {
        try {
            const account = await this.getAccount({ email: userInput.email });
            if (account) {
                await MailerService.sendAlreadyRegisteredEmail(
                    userInput.email,
                    origin
                );

                throw `Email ${userInput.email} is already registered`;
            }

            const newUser = await this.insertUser(userInput, origin);
            const signedUser = await User.query()
                .where({ id: newUser.id })
                .modify("defaultSelectsWithoutPass")
                .withGraphFetched(
                    `[freelancer(defaultSelects), hiringManager(defaultSelects)]`
                )
                .first();

            const token = await jwt.sign(signedUser.toJSON());

            return {
                user: signedUser,
                token,
            };
        } catch (error) {
            throw error;
        }
    }

    static async verifyEmail({ token }) {
        const account = await this.getAccount({ verification_token: token });

        if (!account) throw "Verification failed";

        // account verified
        await account.$query().patch({
            verified: Date.now(),
            isVerified: true,
            verificationToken: null,
        });
    }

    static async create(params, origin) {
        try {
            if (await this.getAccount({ email: params.email })) {
                throw 'Email "' + params.email + '" is already registered';
            }

            const account = await this.insertUser(params, origin);

            return this.basicDetails(account);
        } catch (error) {
            throw error;
        }
        // validate
    }

    static async update(id, params) {
        const account = await this.getAccount({ id });

        // validate if email was changed
        if (
            params.email &&
            account.email !== params.email &&
            (await this.getAccount({ email: params.email }))
        ) {
            const error = new Error(`Email ${params.email} is already taken`);
            throw error;
        }

        // hash password if it was entered
        if (params.password) {
            params.password = await this.hash(params.password);
        }

        const updatedUser = await User.query().patchAndFetchById(id, {
            ...params,
        });

        return this.basicDetails(updatedUser);
    }

    // TODO MAKE SO IT CAN QUERY FOR DIFFERENT TYPES OF USERS
    static async getAll(next = null, limit = null, orderBy = "created_at") {
        let accounts = await User.query().orderBy("created_at").cursorPage();

        if (next) {
            return User.query().orderBy("created_at").cursorPage(next);
        }

        return accounts;
    }

    static async getById(id) {
        const account = await this.getAccount({ id });
        return this.basicDetails(account);
    }

    // TODO MAKE IT ACCEPT AN ARRAY OF ID
    static async _delete(id) {
        await User.query().deleteById(id);
    }

    static async getAccount(params) {
        const account = await User.query()
            .modify("defaultSelects")
            .where({ ...params })
            .first();

        return account;
    }

    static async insertUser(params, origin) {
        const {
            first_name,
            last_name,
            email,
            password,
            role,
            phone_number,
        } = params;

        // hash password and verification token
        const hashedPassword = await this.hash(password);
        const verification_token = this.randomTokenString();

        // save account
        const account = await User.query().insert({
            email,
            first_name,
            last_name,
            password: hashedPassword,
            phone_number,
            role: role,
            active: true,
            isVerified: false,
            verified: new Date().toISOString(),
            verification_token,
        });

        // send email
        // await MailerService.sendVerificationEmail(account, origin);

        return this.basicDetails(account);
    }

    static async hash(password) {
        return await bcrypt.hash(password, 10);
    }

    static randomTokenString() {
        return crypto.randomBytes(40).toString("hex");
    }

    static basicDetails(account) {
        const {
            id,
            first_name,
            last_name,
            phone_number,
            email,
            role,
            created,
            updated,
            isVerified,
        } = account;
        return {
            id,
            first_name,
            last_name,
            phone_number,
            email,
            role,
            created,
            updated,
            isVerified,
        };
    }
}

module.exports = AuthService;
