import {Controller, Get, Query, Route, Tags} from "tsoa";
import Questions from "../models/question";
import {Student} from "../models/users";
import Skills from "../models/skills"; // presupunând că ai exportat Skill ca Skills

type ChapterStatistics = {
    chapter: string;
    correct: number;
    total: number;
};

type SkillStatistics = {
    name: string;
    chapters: ChapterStatistics[];
    totalCorrect: number;
    totalQuestions: number;
};

type ProfileStatistics = SkillStatistics[];

type StatisticsResponse = {
    skillStatistics: SkillStatistics[];
    overallTotalCorrect: number;
    overallTotalQuestions: number;
};

@Route("statistics")
@Tags("Statistics")
export class StatisticsController extends Controller {
    @Get("getUserStatistics")
    public async getUserStatistics(@Query() id: string): Promise<StatisticsResponse | void> {
        const student = await Student.findOne({_id: id});
        if (!student) {
            this.setStatus(404);
            return;
        }

        let overallTotalCorrect = 0;
        let overallTotalQuestions = 0;
        let skillStatistics: SkillStatistics[] = [];

        const skills = await Skills.find();
        for (const skill of skills) {
            let skillStat = {
                name: skill.name,
                chapters: [] as ChapterStatistics[],
                totalCorrect: 0,
                totalQuestions: 0
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
                    skillStat.chapters.push({chapter: chapter, correct: correctAnswers, total: student.totalQuestions[chapter]});
                    skillStat.totalCorrect += correctAnswers;
                    skillStat.totalQuestions += student.totalQuestions[chapter];
                    //}
                }
            }

            if (skillStat.chapters.length > 0) {
                skillStatistics.push(skillStat);
                overallTotalCorrect += skillStat.totalCorrect;
                overallTotalQuestions += skillStat.totalQuestions;
            }


        }

        return {
            skillStatistics: skillStatistics,
            overallTotalCorrect: overallTotalCorrect,
            overallTotalQuestions: overallTotalQuestions
        };
    }
}
