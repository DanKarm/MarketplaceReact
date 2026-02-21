export interface IUser {
    readonly id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    readonly createdAt: Date;
}

