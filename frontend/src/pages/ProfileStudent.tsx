import {useEffect, useState} from "react";
import {ChapterStatistics, SkillStatistics, StatisticsResponse, StatisticsService} from "../api";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";
import {Accordion, AccordionItem, Avatar, Progress} from "@nextui-org/react";
import {useParams} from "react-router-dom";
import Calendar from "../components/calendar.tsx";


function getColor(percentage: number) {
    if (percentage >= 0.75) return "success";
    if (percentage >= 0.45) return "warning";
    return "danger";
}

const formatPercentage = (percentage: number) => {
    return `${Math.round(percentage * 100)}%`;
}

type Props = {
    fromRoute?: boolean
}

export default function ProfileStudent({fromRoute}: Props) {
    const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
    const currentUser = useSelector((state: RootState) => state.user.user);
    const params = useParams();
    useEffect(() => {
        if (currentUser === null && !fromRoute)
            return;
        if (!fromRoute && currentUser) {
            StatisticsService.getUserStatistics(currentUser._id).then((response) => {
                setStatistics(response);
                console.log(response);
            });
        } else {
            const id = params['id'];
            if (!id) return;
            StatisticsService.getUserStatistics(id).then((response) => {
                setStatistics(response);
                console.log(response);
            });
        }
    }, [currentUser]);

    function returnChapter(chapter: ChapterStatistics) {
        return (
            <div className="m-5 border-medium rounded-lg bg-slate-700 lg: w-[80%] mx-auto" key={chapter.chapter}>
                <h3 className="text-center p-4 text-3xl">{chapter.chapter}</h3>
                <div className="border-slate-600 flex border-large rounded">
                    <div
                        className="basis-1/2 text-center border border-slate-600 border-e-medium p-2 bg-slate-800">Total
                        completed questions: {chapter.correct}</div>
                    <div
                        className="basis-1/2 text-center border border-slate-600 border-e-medium p-2 bg-slate-800">Average
                        percentage: {formatPercentage(chapter.correct / chapter.total)}
                    </div>
                </div>
                <Progress size="md" color={getColor(chapter.correct / chapter.total)} aria-label="Loading..."
                          value={chapter.correct / chapter.total * 100}/>
            </div>
        );
    }

    function returnSkill(skill: SkillStatistics) {
        return (
            <div className="m-5 border-medium rounded-lg bg-slate-700 lg: w-[80%] mx-auto" key={skill.name}>
                <h3 className="text-center p-4 text-3xl">{skill.name}</h3>
                <div className="border-slate-600 flex border-large rounded">
                    <div
                        className="basis-1/2 text-center border border-slate-600 border-e-medium p-2 bg-slate-800">Total
                        completed questions: {skill.totalCorrect}</div>
                    <div
                        className="basis-1/2 text-center border border-slate-600 border-e-medium p-2 bg-slate-800">Average
                        percentage: {formatPercentage(skill.totalCorrect / skill.totalQuestions)}
                    </div>
                </div>
                <Progress size="md" color={getColor(skill.totalCorrect / skill.totalQuestions)} aria-label="Loading..."
                          value={skill.totalCorrect / skill.totalQuestions * 100}/>
                <Accordion>
                    <AccordionItem key={skill.name} aria-label="Accordion 1" title="Chapters">
                        {
                            skill.chapters.map((item: any) => returnChapter(item))
                        }
                    </AccordionItem>
                </Accordion>
            </div>
        )
    }

    return (
        <div className="bg-slate-950 pt-5 w-screen overflow-hidden">
            {statistics && currentUser &&
                <>
                    <div className="flex p-5">
                        <div className="flex-none aspect-square">
                            <Avatar isBordered radius="md" className="aspect-square w-full h-full"
                                    src="https://i.pravatar.cc/150?u=a04258a2462d826712d"/>
                        </div>
                        <div className="inline-block bg-slate-800 flex-auto ms-[3px]">
                            <h2 className="text-center text-3xl mt-9 text-slate-200">{currentUser.name}</h2>
                            <h3 className="text-center text-lg text-slate-400">{currentUser.email}</h3>
                            <div className="border-slate-600 flex border-large mt-8 rounded">
                                <div
                                    className="basis-1/2 text-center border border-slate-600 border-e-medium p-4 bg-slate-700">Total
                                    completed questions: {statistics.overallTotalCorrect}</div>
                                <div
                                    className="basis-1/2 text-center border border-slate-600 border-e-medium p-4 bg-slate-700">Average
                                    percentage: {formatPercentage(statistics.overallTotalCorrect / statistics.overallTotalQuestions)}
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <h2 className="text-center text-3xl text-slate-200">Activity</h2>
                    <div className="p-5">
                        <Calendar
                            data={[0, 1, 0, 3, 5, 2, 0, 0, 0, 0, 20, 50, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]}/>
                    </div>
                    <div className='pb-20'>
                        {
                            statistics.skillStatistics.map(item => returnSkill(item))
                        }
                    </div>
                </>
            }
        </div>
    )

}
