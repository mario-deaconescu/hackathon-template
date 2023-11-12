import {RootState} from "../redux/store.tsx";
import {useSelector} from "react-redux";
import CoursesStudent from "../courses/CoursesStudent.tsx";
import CoursesTeacher from "../courses/CoursesTeacher.tsx";

const CoursesPage = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    if (currentUser?.type === 'Student') {
        return (
            <CoursesStudent/>
        );
    } else {
        return (
            <CoursesTeacher/>
        )
    }
};

export default CoursesPage;
