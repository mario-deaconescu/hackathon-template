import { Body, Query, Controller, Post, Get, Request, Route, Security, Tags } from "tsoa";
import Questions, { IQuestion } from "../models/question";
import Users, { Student, IStudent, IUser } from "../models/users";
import { JwtRequest } from "../../authentication";

@Route("questions")
@Tags("Questions")
export class QuestionsController extends Controller {

    @Get("totalQuestions")
    public async getTotalQuestions(
        @Query() chapters: string[],
        @Query() email: string
    ): Promise<number> {
        // Caută studentul pe baza emailului
        const student = await Users.findOne({ email: email }) as IStudent;
        if (!student) {
            this.setStatus(404);
            return 0; // sau orice altă gestionare a erorii
        }

        // Extrage ID-urile întrebărilor rezolvate
        const completedQuestionIds = student.completedQuestions.map(q => q.id);

        // Numără întrebările care nu sunt în completedQuestions
        const totalQuestions = await Questions.countDocuments({
            chapter: { $in: chapters },
            _id: { $nin: completedQuestionIds }
        });

        return totalQuestions;
    }

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
    public async responseQuiz(
        @Body() body: { email: string, responses: Array<{ questionId: string, answer: number }> }
    ): Promise<Array<{ questionId: string, isCorrect: boolean, correctAnswer: number }>> {
        let results = [];

        // Obține studentul bazat pe email
        const student = await Student.findOne({ email: body.email });
        if (!student) {
            this.setStatus(404); // sau orice altă gestionare a erorii
            return [];
        }

        student.totalQuestions += body.responses.length;
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
                    student.completedQuestions.push({id: response.questionId, date: new Date()});
                }
            }
        }

        // Salvează modificările făcute asupra studentului
        await student.save();



        return results;
    }
}
