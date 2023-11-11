import {model, Model, Schema} from "mongoose";
import {ITeacher} from "./users";

export interface CourseCreateModel {
    name: string;
    content: string;
    chapters: string[];
    questions: ICourseQuestion[];
}

export interface ICourseQuestion {
    description: string;
    answers: string[];
    correctAnswer: number;
}

export interface ICourse {
    teacher: ITeacher;
    name: string;
    chapters: string[];
    content: string;
    questions: ICourseQuestion[];
}

export interface CourseWithSubscribers extends ICourse {
    subscribers: number;
}

type CourseModel = Model<ICourse>;

const courseSchema = new Schema<ICourse, CourseModel>({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    chapters: {
        type: [String],
        required: true,
    },
    questions: {
        type: [{
            description: String,
            answers: [String],
            correctAnswer: Number,
        }],
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
    }
});

const Course = model<ICourse, CourseModel>('Courses', courseSchema);

export default Course;

