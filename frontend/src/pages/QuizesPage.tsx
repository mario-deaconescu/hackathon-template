import {useEffect, useState} from "react";
import {ISkill, SkillsService} from "../api";
import {Select, Selection, SelectItem} from "@nextui-org/react";

const QuizesPage = () => {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);
    const [selectedChapters, setSelectedChapters] = useState<Selection>(new Set([]));
    useEffect(() => {
        SkillsService.getAllSkills().then((response) => {
            setSkills(response);
        });
    }, []);
    useEffect(() => {
        console.log(selectedSkill);
    });
    const selectSkill = (selection: Selection) => {
        setSelectedSkill(skills.find((skill) => skill.name == Array.from(selection)[0]) || null);
    }
    return (
        <div className="w-full h-full">
            <div className="flex flex-row w-fit justify-center items-center gap-2">
                <Select
                    label="Skill"
                    className="w-80"
                    placeholder="Select a skill"
                    onSelectionChange={selectSkill}>
                    {skills.map((skill) => (
                        <SelectItem key={skill.name} value={skill.name}>
                            {skill.name}
                        </SelectItem>
                    ))}
                </Select>
                {selectedSkill &&
                    <Select
                        label="Chapters"
                        className="w-80"
                        placeholder="Select Chapters"
                        onSelectionChange={setSelectedChapters}>
                        {selectedSkill.chapters.map((chapter) => (
                            <SelectItem key={chapter} value={chapter}>
                                {chapter}
                            </SelectItem>
                        ))}
                    </Select>
                }
            </div>
        </div>
    );
};

export default QuizesPage;
