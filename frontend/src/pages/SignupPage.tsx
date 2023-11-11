import SignupUser from "../auth/SignupUser.tsx";
import {useMemo} from "react";
import SignupTeacher from "../auth/SignupTeacher.tsx";
import SignupRecruiter from "../auth/SignupRecruiter.tsx";

type Props = {
    type: string;
}

const SignupPage = ({type}: Props) => {
    const signupElement = useMemo(() => {
        if (type === 'student') {
            return <SignupUser/>
        } else if (type === 'teacher') {
            return <SignupTeacher/>
        } else if (type === 'recruiter') {
            return <SignupRecruiter/>
        }
    }, [type]);
    return (
        <div className="flex flex-row h-full">
            <div className="w-1/2 h-full hidden lg:flex">
                <img src="https://source.unsplash.com/random" alt="random"/>
            </div>
            <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-5">
                {signupElement}
            </div>
        </div>
    );
};

export default SignupPage;
