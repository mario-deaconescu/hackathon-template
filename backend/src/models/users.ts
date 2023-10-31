import {Model, model, Schema} from "mongoose";
import * as bcrypt from 'bcrypt';

export interface UserCreateModel {
    name: string;
    email: string;
    password: string;
}

export interface UserLoginModel {
    email: string;
    password: string;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IUserMethods {
    isValidPassword: (password: string) => Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;


const usersSchema = new Schema<IUser, UserModel, IUserMethods>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        validate: {
            validator: (email: string) => {
                return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
            }
        },
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});


usersSchema.pre(
    'save',
    async function (next) {
        const user = this;
        this.password = await bcrypt.hash(user.password, 10);
        next();
    }
);

usersSchema.method('isValidPassword', async function (password: string) {
    const user = this;
    console.log(user.password, password);
    return await bcrypt.compare(password, user.password);
});


const User = model<IUser, UserModel>('User', usersSchema);

export default User;
