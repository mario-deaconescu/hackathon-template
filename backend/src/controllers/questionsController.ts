import { Body, Controller, Get, Post, Request, Route, Security, Tags } from "tsoa";
import Questions, { IQuestion } from "../models/question";
import Users, { Student, IStudent } from "../models/users";
import { JwtRequest } from "../../authentication";

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
    @Security("jwt") // Asigură-te că acest decorator este utilizat corect
    public async responseQuiz(@Request() request: JwtRequest, @Body() body: { responses: Array<{ questionId: string, answer: number }> }): Promise<Array<{ questionId: string, isCorrect: boolean, correctAnswer: number }>> {
        let results = [];

        // Obține studentul curent
        console.log(request.user.email);
        const student = await Student.findOne({ email: request.user.email });
        console.log(student?.email);
        if (!student) {
            this.setStatus(401); // sau orice altă gestionare a erorii
            return []; 
        }

        for (const response of body.responses) {
            const question = await Questions.findById(response.questionId);

            if (question) {
                const isCorrect = question.correctAnswer === response.answer;
                results.push({
                    questionId: response.questionId,
                    isCorrect: isCorrect,
                    correctAnswer: question.correctAnswer
                });

                // Adaugă la completedQuestions dacă răspunsul este corect
                if (isCorrect) {
                    student.completedQuestions.push({ id: response.questionId, date: new Date() });
                }
            }
        }

        // Salvează modificările făcute asupra studentului
        await student.save();

        return results;
    }
    
}
