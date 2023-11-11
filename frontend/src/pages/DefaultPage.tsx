import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";
import {Navigate} from "react-router-dom";

const DefaultPage = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    if (currentUser?.type === 'Student') {
        return (
            <Navigate to='quizes'/>
        );
    } else if (currentUser?.type === 'Teacher') {
        return (
            <Navigate to='courses'/>
        );
    }
    return (
        <div></div>
    );
};

export default DefaultPage;
