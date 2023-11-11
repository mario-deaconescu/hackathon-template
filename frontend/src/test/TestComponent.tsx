import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../redux/store.tsx";
import {useForm} from "react-hook-form";
import {login, signOut} from "../redux/userSlice.ts";
import {toast} from "react-toastify";

interface FormValues {
    email: string
    password: string
}

const TestComponent = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
    } = useForm<FormValues>({
        criteriaMode: "all",
    });
    const submitForm = (values: FormValues) => {
        toast('Logging in')
        dispatch(login({
            email: values.email,
            password: values.password
        }));
    }
    return (
        <div>
            <h1>
                Current
                user: {currentUser !== null ? (`Email: ${currentUser.email}, Name: ${currentUser.name}`) : 'None'}
            </h1>
            <h2>
                Roles: {currentUser !== null ? currentUser.roles.join(', ') : 'None'}
            </h2>
            <form>
                <input type="email" {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                    },
                })}/>
                <input type="password" {...register("password", {
                    required: "Password is required",
                })}/>
                <button onClick={handleSubmit(submitForm)}>Submit</button>
            </form>
            <button onClick={() => dispatch(signOut())}>Sign Out</button>
            <h1>Hello World</h1>
        </div>
    );
};

export default TestComponent;
