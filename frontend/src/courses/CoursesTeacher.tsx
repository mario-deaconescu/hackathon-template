import {Button, Card, CardBody, CardHeader, Chip, useDisclosure} from "@nextui-org/react";
import {AiOutlinePlus} from "react-icons/ai";
import CourseModal from "./CourseModal.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";
import {useEffect, useState} from "react";
import {CourseService, CourseWithSubscribers} from "../api";

const CoursesTeacher = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [myCourses, setMyCourses] = useState<CourseWithSubscribers[]>([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useEffect(() => {
        if (currentUser === null) {
            return;
        }
        CourseService.myCourses(currentUser.email).then((response) => {
            setMyCourses(response);
        });
    }, [currentUser]);
    return (
        <>
            <div className="p-10">
                <div className="flex flex-wrap gap-4 justify-between items-center">
                    <h1 className="text-4xl font-medium justify-center">
                        My Courses
                    </h1>
                    <Button color="primary" onClick={onOpen}>
                        Add
                        <AiOutlinePlus/>
                    </Button>
                </div>
                <div className="flex flex-wrap gap-4 flex-col p-5">
                    {
                        myCourses.map((course) => (
                            <Card key={course.name} className="p-4">
                                <CardHeader>
                                    <h3 className="w-full flex flex-row flex-wrap text-3xl">
                                        <span className="mr-3"> {course.name} </span>
                                        {
                                            course.chapters.map((chapter) => (
                                                <Chip key={chapter} color="primary" className="m-1">
                                                    {chapter}
                                                </Chip>
                                            ))
                                        }
                                    </h3>
                                </CardHeader>
                                <CardBody>
                                        <span className="opacity-50">
                                            {course.subscribers} students enrolled
                                        </span>
                                </CardBody>
                            </Card>
                        ))
                    }
                </div>
            </div>
            <CourseModal isOpen={isOpen} onOpenChange={onOpenChange} onAdd={() => {
            }}/>
        </>
    );
};

export default CoursesTeacher;
