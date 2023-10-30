import {model, Schema} from "mongoose";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

const users = new Schema<IUser>({
    id: String,
    name: String,
    email: String,
    password: String,
});

const User = model<IUser>('User', users);

export default User;
