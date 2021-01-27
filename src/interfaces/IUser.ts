export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    phone_number: string;
    password: string;
}

export interface IUserInput {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    phone_number: string;
    password: string;
}
