import {Body, Controller, Get, Post, Query, Route, Tags} from "tsoa";
import Questions, {IQuestion} from "../models/question";
import {IStudent, Student} from "../models/users";
import generateQuestions from "../workers/questionGeneration";

@Route("questions")
@Tags("Questions")
export class QuestionsController extends Controller {

    @Post("totalQuestions")
    public async getTotalQuestions(
        @Body() body: {
            chapters: string[]
        },
        @Query() email: string
    ): Promise<number> {
        // Caută studentul pe baza emailului
        const student = await Student.findOne({email: email}) as IStudent;
        if (!student) {
            this.setStatus(404);
            return 0; // sau orice altă gestionare a erorii
        }

        // Extrage ID-urile întrebărilor rezolvate
        const completedQuestionIds = student.completedQuestions.map(q => q.id);

        // Numără întrebările care nu sunt în completedQuestions
        const totalQuestions = await Questions.countDocuments({
            chapter: {$in: body.chapters},
            _id: {$nin: completedQuestionIds}
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
    public async createQuestion(@Body() question: Omit<IQuestion, '_id'>): Promise<IQuestion | void> {
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
            chapter: {$in: body.chapters}
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
        const student = await Student.findOne({email: body.email});
        if (!student) {
            this.setStatus(404);
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

                // Inițializează contorul pentru capitol dacă nu există
                const chapter = question.chapter;
                if (!student.totalQuestions[chapter]) {
                    student.totalQuestions[chapter] = 0;
                }

                // Actualizează contorul pentru capitol
                student.totalQuestions[chapter]++;

                // Adaugă la completedQuestions dacă răspunsul este corect
                if (isCorrect) {
                    student.completedQuestions.push({id: response.questionId, date: new Date()});
                }
            }
        }

        // Marchează câmpul totalQuestions ca fiind modificat
        student.markModified('totalQuestions');

        // Salvează modificările făcute asupra studentului
        await student.save();

        return results;
    }

    @Post("startGeneration")
    public async startGeneration(): Promise<void> {
        generateQuestions();
    }

}
