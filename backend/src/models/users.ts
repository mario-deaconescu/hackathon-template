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
    type: string;
}

export interface IStudent extends IUser {
    completedQuestions: {
        id: string,
        date: Date,
    }[];
    // totalQuestions: number;
    totalQuestions: {
        [chapter: string]: number;
    };
    subscribedCourses: string[];
}

export interface ITeacher extends IUser {
    courses: string[];
}

export interface IRecruiter extends IUser {

}

export interface IUserMethods {
    isValidPassword: (password: string) => Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;
type StudentModel = Model<IStudent, {}, IUserMethods>;
type TeacherModel = Model<ITeacher, {}, IUserMethods>;
type RecruiterModel = Model<IRecruiter, {}, IUserMethods>;


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
    },
    // totalQuestions: {
    //     type: Number,
    //     default: 0,
    // },
    totalQuestions: {
        type: Object,
        default: {}
    },
    subscribedCourses: {
        type: [String],
        default: [],
    }
});

const teachersSchema = new Schema<ITeacher, TeacherModel, IUserMethods>({});

const recruitersSchema = new Schema<IRecruiter, UserModel, IUserMethods>({});

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
const Teacher = User.discriminator<ITeacher, TeacherModel>('Teacher', teachersSchema);
const Recruiter = User.discriminator<IRecruiter, RecruiterModel>('Recruiter', recruitersSchema);

export default User;
export {Student, Teacher, Recruiter};
