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

    @Post("randomQuiz")
    public async getRandomQuestions(@Body() body: { chapters: string[], numberOfQuestions: number }): Promise<IQuestion[]> {
        const questions = await Questions.find({
            chapter: { $in: body.chapters }
        });
        
        // Amestecă și selectează un număr aleatoriu de întrebări
        const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
        return shuffledQuestions.slice(0, body.numberOfQuestions);

        //return questions;

    }

    @Post("responseQuiz")
    public async responseQuiz(@Body() body: { responses: Array<{ questionId: string, answer: number }> }): Promise<Array<{ questionId: string, isCorrect: boolean, correctAnswer: number }>> {
        let results = [];

        for (const response of body.responses) {
            const question = await Questions.findById(response.questionId);

            if (question) {
                results.push({
                    questionId: response.questionId,
                    isCorrect: question.correctAnswer === response.answer,
                    correctAnswer: question.correctAnswer
                });
            }
        }

        return results;
    }
    
}
