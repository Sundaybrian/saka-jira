const crypto = require("crypto");
const jwt = require("../utils/jwt");
const bcrypt = require("bcryptjs");
const User = require("../models/User/User.Model");
const RefreshToken = require("../models/RefreshToken/RefreshToken.Model");
const scheduler = require("../jobs/scheduler");
const agenda = require("../jobs/agenda");

class AuthService {
    constructor() {}

    static async login(email, password, ipAddress) {
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
        const refreshToken = await generateRefreshToken(
            loggedIn.toJSON(),
            ipAddress
        );

        return {
            user: loggedIn,
            token,
            refreshToken,
        };
    }

    static async register(userInput, origin) {
        try {
            const account = await this.getAccount({ email: userInput.email });
            if (account) {
                // schedule to send email after 2mins
                await scheduler.scheduleAlreadyRegisteredEmail({
                    email: userInput.email,
                    origin,
                });

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

            // schedule to send verification email 10 minutes
            await scheduler.scheduleWelcomeEmail({
                account,
                origin,
            });

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

            return account;
        } catch (error) {
            throw error;
        }
        // validate
    }

    static async update(id, params) {
        const account = await this.getAccount({ id });

        try {
            // validate if email was changed
            if (
                params.email &&
                account.email !== params.email &&
                (await this.getAccount({ email: params.email }))
            ) {
                const error = new Error(
                    `Email ${params.email} is already taken`
                );
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
        } catch (error) {
            throw error;
        }
    }

    // TODO MAKE SO IT CAN QUERY FOR DIFFERENT TYPES OF USERS
    static async getAll(next = null, match = null, limit) {
        let accounts = await User.query()
            .orderBy("created_at")
            .limit(limit)
            .cursorPage();

        if (next) {
            return User.query()
                .orderBy("created_at")
                .limit(limit)
                .cursorPage(next);
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
            image_url,
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
            image_url,
            role: role,
            active: true,
            isVerified: false,
            verified: new Date().toISOString(),
            verification_token,
        });

        return account;
    }

    static async forgotPassword({ email }, origin) {
        try {
            const account = await User.query()
                .where({
                    email,
                })
                .first();

            //always return ok to prevent email enumeration
            if (!account) return;

            //create reset token that expires after 24hrs
            const $updatedAccount = await account.$query().patchAndFetch({
                resetToken: this.randomTokenString(),
                reset_token_expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });

            // send email sendPasswordResetEmail via agendajs

            await agenda.schedule("in 1 minutes", "send-password-reset-email", {
                account: $updatedAccount,
                origin,
            });
        } catch (error) {
            throw error;
        }
    }

    static async refreshToken() {}

    // helpers
    static async generateRefreshToken(account, ipAddress) {
        //creat a refresh token that expires in 7days
        return await RefreshToken.query().insert({
            accountId: account.id,
            token: randomTokenString(),
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            createdByIp: ipAddress,
        });
    }
    static async hash(password) {
        return await bcrypt.hash(password, 8);
    }

    static randomTokenString() {
        return crypto.randomBytes(40).toString("hex");
    }

    // TODO DEPRECATE
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
            image_url,
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
            image_url,
        };
    }
}

module.exports = AuthService;
