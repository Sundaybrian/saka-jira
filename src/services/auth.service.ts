const { Service, Inject } = require("typedi");
import { IUser, IUserInput } from "../interfaces/IUser";
const jwt = require("../utils/jwt");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/User/User.Model");

@Service
export default class AuthService {
    constructor() {}

    public async login(
        email: string,
        password: string
    ): Promise<{ user: IUser; token: string }> {
        const account = await this.getAccount({ email });
        if (
            !account ||
            // !account.isVerified ||
            !(await bcrypt.compare(password, account.password))
        ) {
            const error = new Error("Email or password is incorrect");
            throw error;
        }

        const token = await jwt.sign(account.toJSON());

        return {
            user: this.basicDetails(account),
            token,
        };
    }

    public async register(
        userInput: IUserInput,
        origin: string
    ): Promise<{ user: IUser; token: string }> {
        try {
            const account = await this.getAccount({ email: userInput.email });
            if (account) {
                throw new Error(
                    "Email" + userInput.email + "is already registered"
                );
            }

            const newUser = await this.insertUser(userInput);
            const token = await jwt.sign(newUser);

            return {
                user: newUser,
                token,
            };
        } catch (error) {
            throw error;
        }
    }

    public async verifyEmail({ token }) {
        const account = await this.getAccount({ verificationToken: token });

        if (!account) throw "Verification failed";

        // account verified
        await account.$query().patch({
            verified: Date.now(),
            isVerified: true,
            verificationToken: null,
        });
    }

    public async create(params: IUserInput) {
        // validate
        if (await this.getAccount({ email: params.email })) {
            throw 'Email "' + params.email + '" is already registered';
        }

        const account = await this.insertUser(params);

        return this.basicDetails(account);
    }

    public async update(id: number, params: Partial<IUserInput>) {
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
    public async getAll() {
        const accounts = await User.query();
        return accounts.map((x: IUser) => this.basicDetails(x));
    }

    public async getById(id: number) {
        const account = await this.getAccount({ id });
        return this.basicDetails(account);
    }

    // TODO MAKE IT ACCEPT AN ARRAY OF ID
    public async _delete(id: number) {
        await User.query().deleteById(id);
    }

    private async getAccount(params) {
        const account = await User.query()
            .where({ ...params })
            .first();

        return account;
    }

    private async insertUser(params: IUserInput) {
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
        const verificationToken = this.randomTokenString();

        // create account
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
            verificationToken,
        });

        return this.basicDetails(account);
    }

    private async hash(password: string) {
        return await bcrypt.hash(password, 10);
    }

    private randomTokenString() {
        return crypto.randomBytes(40).toString("hex");
    }

    private basicDetails(account: IUser) {
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
