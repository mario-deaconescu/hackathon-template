import {openApi} from "../../index";
import Skills from "../models/skills";
import Question, {IQuestion} from "../models/question";

let interval: any;

type Question = {
    skill: string;
    description: string;
    answers: string[];
    correctAnswer: number;
}

const generate = async () => {
    const skills = await Skills.find({});
    const chapters = skills.flatMap(skill => skill.chapters);

    const questions = await Promise.all(chapters.map(async chapter => {
        const prompt = `I have a skill: ${chapter}.` + '\n' +
            `I want you to generate 5 questions for the skill in a json format as follows:` + '\n' +
            `{"questions": [ {"skill": string, "description": string, "answers": string[], "correctAnswer": number } ] }` + '\n' +
            `There are 4 answers, and correctAnswer is the index of the correct answer, starting from 0.` + '\n' +
            `Don't include anything other than the json object.` + '\n' +
            `The questions should be in English.`;
        const completion = openApi.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'system',
                content: prompt,
            }]
        });
        const result = (await completion).choices[0];
        console.log(result.message.content);
        try {
            const questions: Question[] = JSON.parse(result.message.content as string).questions;
            return questions;
        } catch (e) {
            return null;
        }
    }));
    const filteredQuestions = questions.filter(question => question !== null).flatMap(question => question) as Question[];
    const models = filteredQuestions.map((question): Omit<IQuestion, '_id'> => {
        return {
            chapter: question.skill,
            description: question.description,
            answers: question.answers,
            correctAnswer: question.correctAnswer,
        }
    });
    await Question.insertMany(models);
}

const generateQuestions = () => {
    // Get current time
    generate().then(() => {
        // Start interval every 24 hours
        interval = setInterval(async () => {
            await generate();
        }, 24 * 60 * 60 * 1000);
    })
}

export default generateQuestions;
