import {Body, Controller, Post, Route, Tags} from "tsoa";
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
}
