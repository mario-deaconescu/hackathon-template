import {Controller, Get, Query, Route, Tags} from "tsoa";
import Skills from "../models/skills";
import {openApi} from "../../index";
import {IStudent, Student} from "../models/users";
import Question from "../models/question";

type QueryResult = {
    skills: {
        name: string,
        desirability: number,
    }[]
}

type RecruitResult = {
    candidates: {
        student: IStudent,
        desirability: number,
    }[]
}

@Route("recruit")
@Tags("Recruit")
export class RecruitController extends Controller {

    @Get("query")
    public async getQuery(@Query() query: string): Promise<RecruitResult> {
        const skills = await Skills.find({});
        const chapters = skills.flatMap(skill => skill.chapters);
        const prompt = `I have a list of available skills: ${chapters.join(', ')}.` + '\n' +
            `Based on the following job description, I want to know which skills are required for this job.` + '\n' +
            `Job description: ${query}` + '\n' +
            `The result should be in plain json format, as follows: { "skills": [ {"name": string, "desirability": number} ] }, where desirability is between 0 and 1.` + '\n' +
            `Don't include anything other than the json object.`;
        const completion = await openApi.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'system',
                content: prompt,
            }],
        });
        const result = completion.choices[0];
        console.log(result.message.content);
        const desiredChapters: QueryResult = JSON.parse(result.message.content as string);
        // Sort users by desirability
        let candidates: {
            student: Omit<IStudent, 'password'>,
            chaptersCompleted: {
                name: string,
                completed: number,
                total: number,
            }[]
        }[] = [];
        // Find students where totalQuestions[chapter] > 0, where chapter is in desiredChapters
        const students = await Student.find({
            $or: desiredChapters.skills.map(skill => {
                    return {
                        [`totalQuestions.${skill.name}`]: {$gt: 0}
                    }
                }
            )
        });
        const weightedSkills = await Promise.all(students.map(async student => {
            let skills: {
                [chapter: string]: {
                    total: number,
                    completed: number,
                }
            } = {};
            for (const skill of desiredChapters.skills) {
                skills[skill.name] = {
                    total: student.totalQuestions[skill.name],
                    completed: await Question.countDocuments({
                        chapter: skill.name,
                        _id: {$in: student.completedQuestions.map(q => q.id)}
                    })
                };
            }
            return {
                student: student,
                skills: skills
            }
        }));
        const weightedStudents = weightedSkills.map(weightedSkill => {
            let desirability = 0;
            Object.entries(weightedSkill.skills).forEach(([skillName, value]) => {
                desirability += value.completed * (desiredChapters.skills.find(s => s.name === skillName)?.desirability ?? 0);
            });
            return {
                student: weightedSkill.student,
                desirability: desirability
            }
        });
        return {
            candidates: weightedStudents.sort((a, b) => b.desirability - a.desirability)
        }
    }
}
