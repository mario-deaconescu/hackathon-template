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
    roles: string[];
}

export interface IStudent extends IUser {
    completedQuestions: {
        id: string,
        date: Date,
    }[];
}

export interface IUserMethods {
    isValidPassword: (password: string) => Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;
type StudentModel = Model<IStudent, {}, IUserMethods>;


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
    roles: {
        type: [String],
        default: ['member'],
    }
}, {
    timestamps: true,
    discriminatorKey: 'type',
});

const studentsSchema = new Schema<IStudent, StudentModel, IUserMethods>({
    completedQuestions: {
        type: [{
            id: String,
            date: Date,
        }],
        default: [],
    }
});

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
    return await bcrypt.compare(password, user.password);
});


const User = model<IUser, UserModel>('User', usersSchema);

const Student = User.discriminator<IStudent, StudentModel>('Student', studentsSchema);

export default User;
export {Student};
