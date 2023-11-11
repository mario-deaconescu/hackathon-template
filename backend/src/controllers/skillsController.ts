import {Body, Controller, Get, Post, Route, Tags} from "tsoa";
import Skills, {ISkill} from "../models/skills";

@Route("skills")
@Tags("Skills")
export class SkillsController extends Controller {

    @Post("create")
    public async createSkill(@Body() skill: ISkill): Promise<ISkill | void> {
        const newSkill = new Skills(skill);
        const savedSkill = await newSkill.save();
        if (!savedSkill) {
            this.setStatus(500);
            return;
        }
        this.setStatus(202);
        return savedSkill;
    }

    @Get("all")
    public async getAllSkills(): Promise<ISkill[]> {
        return Skills.find({});
    }

    @Get("{skillName}")
    public async getChapters(skillName: string): Promise<string[] | void> {
        const skill = await Skills.findOne({name: skillName});
        if (!skill) {
            this.setStatus(404);
            return;
        }
        return skill.chapters;
    }
}