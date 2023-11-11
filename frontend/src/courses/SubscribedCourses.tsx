import {Card, CardBody, CardHeader, Chip, User} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";
import {CourseService, CourseWithSubscribers} from "../api";
import useSWR, {Fetcher} from "swr";

const SubscribedCourses = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const fetcher: Fetcher<CourseWithSubscribers[], {
        apiKey: string,
    }> = () => {
        return CourseService.getSubscribedCourses(currentUser?.email ?? '');
    }
    const {data: myCourses, isLoading} = useSWR({
        apiKey: 'findCourses',
    }, fetcher);
    return (
        <div>
            <h1 className="text-4xl font-medium justify-center mb-5">
                My Courses
            </h1>
            <div className="flex flex-wrap gap-4 w-full">
                {
                    myCourses?.map((course) => (
                        <Card key={course.name} className="p-4 w-full">
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
                                <div className="flex flex-row flex-wrap gap-5 items-center">
                                    <User name={course.teacher.name} description={course.teacher.email}
                                          avatarProps={{radius: "lg", src: undefined}}/>
                                    <span className="opacity-50">
                                                {course.subscribers} students enrolled
                                            </span>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default SubscribedCourses;
