import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";
import SubscribedCourses from "./SubscribedCourses.tsx";
import FindCourses from "./FindCourses.tsx";
import {Divider} from "@nextui-org/react";

const CoursesStudent = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    return (
        <div className="p-10 flex flex-col gap-5">
            <FindCourses/>
            <Divider/>
            <SubscribedCourses/>
        </div>
    );
};

export default CoursesStudent;
