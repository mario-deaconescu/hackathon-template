import {RootState} from "../redux/store.tsx";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {CourseService, ICourse} from "../api";

const CoursesPage = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [myCourses, setMyCourses] = useState<ICourse[]>([]);
    useEffect(() => {
        if (currentUser?.type === 'Student') {
            CourseService.getSubscribedCourses(currentUser.email).then((response) => {
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
    }
};

export default CoursesPage;
