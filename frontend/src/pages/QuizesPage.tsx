import {useEffect, useMemo, useState} from "react";
import {ISkill, QuestionsService, SkillsService} from "../api";
import {Select, Selection, SelectItem} from "@nextui-org/react";
import Quiz from "../quiz/Quiz.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";

const QuizesPage = () => {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);
    const [selectedChapters, setSelectedChapters] = useState<Selection>(new Set([]));
    const [availableQuestions, setAvailableQuestions] = useState<number>(0);
    const currentUser = useSelector((state: RootState) => state.user.user);
    useEffect(() => {
        SkillsService.getAllSkills().then((response) => {
            setSkills(response);
        });
    }, []);
    useEffect(() => {
        console.log(selectedSkill);
    });
    useEffect(() => {
        QuestionsService.getTotalQuestions(Array.from(selectedChapters) as string[], currentUser?.email ?? '').then((response) => {
            setAvailableQuestions(response);
        });
    }, [selectedChapters]);
    const selectSkill = (selection: Selection) => {
        setSelectedSkill(skills.find((skill) => skill.name == Array.from(selection)[0]) || null);
    }
    const quiz = useMemo(() => (
        <Quiz chapters={Array.from(selectedChapters) as string[]} questionNumber={Math.min(5, availableQuestions)}/>
    ), [selectedChapters]);
    return (
        <div className="w-full h-full p-10 overflow-y-auto">
            <div className="w-full lg:w-fit flex flex-row justify-center items-center gap-2 flex-wrap">
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
                        selectionMode="multiple"
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
                {selectedChapters &&
                    <div className="w-80">
                        {availableQuestions} questions available
                    </div>}
            </div>
            <div className="p-5">
                {Array.from(selectedChapters).length > 0 && quiz}
            </div>
        </div>
    );
};

export default QuizesPage;
