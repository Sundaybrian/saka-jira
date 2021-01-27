export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    phone_number: string;
    created: Date;
    updated: Date;
    isVerified: boolean;
}

export interface IUserInput {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    phone_number: string;
    password: string;
}
