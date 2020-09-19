export interface IUser {
    username: string;
    displayName: string;
    token: string;
    Image?: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}