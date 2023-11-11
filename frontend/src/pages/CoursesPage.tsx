import {RootState} from "../redux/store.tsx";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {CourseService, ICourse} from "../api";
import {Button, useDisclosure} from "@nextui-org/react";
import {AiOutlinePlus} from "react-icons/ai";
import CourseModal from "../courses/CourseModal.tsx";

const CoursesPage = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [myCourses, setMyCourses] = useState<ICourse[]>([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useEffect(() => {
        console.log(currentUser);
        if (currentUser?.type === 'Student') {
            CourseService.getSubscribedCourses(currentUser.email).then((response) => {
                setMyCourses(response);
            });
        } else if (currentUser?.type === 'Teacher') {
            console.log('teacher');
            CourseService.myCourses(currentUser.email).then((response) => {
                console.log(response);
                setMyCourses(response);
            });
        }
    }, []);
    if (currentUser?.type === 'Student') {
        return (
            <div className="p-10">
                <h1 className="text-4xl font-medium justify-center">
                    My Courses
                </h1>
                <div className="flex flex-wrap gap-4">
                    {
                        myCourses.map((course) => (
                            <div className="border-medium rounded-lg bg-slate-700 lg: w-[80%] mx-auto"
                                 key={course.name}>
                                <h3 className="text-center p-4 text-3xl">{course.name}</h3>
                                <div className="border-slate-600 flex border-large rounded">
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    } else {
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

                        }
                    </div>
                </div>
                <CourseModal isOpen={isOpen} onOpenChange={onOpenChange} onAdd={() => {
                }}/>
            </>
        )
    }
};

export default CoursesPage;
