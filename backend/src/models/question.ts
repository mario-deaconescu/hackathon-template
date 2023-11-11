import {model, Model, Schema} from "mongoose";

export interface IQuestion {
    _id: string,
    chapter: string,
    description: string,
    answers: string[],
    correctAnswer: number,
}

type QuestionModel = Model<IQuestion>;

const questionsSchema = new Schema<IQuestion, QuestionModel>({
    chapter: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    answers: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: Number,
        required: true,
    }
});

const Question = model<IQuestion, QuestionModel>('Question', questionsSchema);

export default Question;
