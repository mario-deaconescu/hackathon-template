import {Body, Controller, Get, Post, Route, Tags} from "tsoa";
import Questions, {IQuestion} from "../models/question";

@Route("questions")
@Tags("Questions")
export class QuestionsController extends Controller {

    @Get("{questionId}")
    public async getQuestion(questionId: string): Promise<IQuestion | void> {
        const question = await Questions.findOne({_id: questionId});
        if (!question) {
            this.setStatus(404);
            return;
        }
        return question;
    }

    @Post("create")
    public async createQuestion(@Body() question: IQuestion): Promise<IQuestion | void> {
        const newQuestion = new Questions(question);
        const savedQuestion = await newQuestion.save();
        if (!savedQuestion) {
            this.setStatus(500);
            return;
        }
        this.setStatus(202);
        return savedQuestion;
    }
}
