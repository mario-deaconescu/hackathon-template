import {CourseService, CourseWithSubscribers} from "../api";
import {useEffect, useState} from "react";
import {Chip, User} from "@nextui-org/react";
import {useParams} from "react-router-dom";


const CoursePage = () => {
    const [course, setCourse] = useState<CourseWithSubscribers | null>(null);
    const params = useParams();
    useEffect(() => {
        const id = params.id;
        if (id === undefined) {
            return;
        }
        CourseService.getCourse(id).then((response) => {
            setCourse(response);
        });
    }, [params.id]);
    return (
        <div className={"flex flex-col gap-4 p-5"}>
            <div className={"flex flex-row gap-4 w-full justify-between"}>
                <div className={"flex flex-row gap-4 items-center"}>
                    <h1 className={"text-4xl font-medium"}>{course?.name}</h1>
                    <div className="flex flex-row items-center flex-wrap">
                        {
                            course?.chapters.map((chapter) => (
                                <Chip key={chapter} color="primary" className="m-1">
                                    {chapter}
                                </Chip>
                            ))
                        }
                    </div>
                </div>
                <div className={"flex flex-row gap-4 items-center justify-end"}>
                    <User name={course?.teacher.name} description={course?.teacher.email} avatarProps={{
                        radius: "lg",
                        src: undefined
                    }}/>
                </div>
            </div>
            <div>
                {course?.content}
            </div>
        </div>
    );
};

export default CoursePage;
