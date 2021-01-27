const { Service, Inject } = require("typedi");
import { IUser, IUserInput } from "../interfaces/IUser";
const jwt = require("../utils/jwt");
const config = require("../config/index");
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