import {model, Model, Schema} from "mongoose";

export interface ISkill {
    name: string,
    chapters: string[],
}

type SkillModel = Model<ISkill>;

const skillsSchema = new Schema<ISkill, SkillModel>({
    name: {
        type: String,
        required: true,
    },
    chapters: {
        type: [String],
        required: true,
    }
});

const Skill = model<ISkill, SkillModel>('Skills', skillsSchema);

export default Skill;
