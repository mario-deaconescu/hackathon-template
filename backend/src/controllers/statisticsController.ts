import { Body, Query, Controller, Post, Get, Request, Route, Security, Tags } from "tsoa";
import Questions, { IQuestion } from "../models/question";
import Users, { Student, IStudent, IUser } from "../models/users";
import Skills, { ISkill } from "../models/skills"; // presupunând că ai exportat Skill ca Skills
import { JwtRequest } from "../../authentication";

type ChapterStatistics = {
    chapter: string;
    correct: number;
    total: number;
};

@Route("statistics")
@Tags("Statistics")
export class StatisticsController extends Controller {
    @Get("getUserStatistics")
public async getUserStatistics(@Query() email: string): Promise<any> {
    const student = await Student.findOne({ email: email });
    if (!student) {
        this.setStatus(404);
        return {};
    }

    let skillStatistics = [];

    const skills = await Skills.find();
    for (const skill of skills) {
        let skillStat = {
            name: skill.name,
            chapters: [] as ChapterStatistics[]
        };

        for (const chapter of skill.chapters) {
            if (student.totalQuestions[chapter]) {
                //let totalAnswers = 0;
                let correctAnswers = 0;

                for (const completedQuestion of student.completedQuestions) {
                    const question = await Questions.findById(completedQuestion.id);
                    if (question && question.chapter === chapter) {
                        correctAnswers++;
                    }
                }

                //if (totalAnswers > 0) {
                    skillStat.chapters.push({ chapter: chapter, correct: correctAnswers, total: student.totalQuestions[chapter] });
                //}
            }
        }

        if (skillStat.chapters.length > 0) {
            skillStatistics.push(skillStat);
        }

        
    }

    return skillStatistics;
}
}