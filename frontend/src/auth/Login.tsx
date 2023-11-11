import {Button, Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {RootState, useAppDispatch} from "../redux/store.tsx";
import {login, signOut} from "../redux/userSlice.ts";
import {useSelector} from "react-redux";
import {useEffect} from "react";

interface FormValues {
    email: string
    password: string
}

const Login = () => {
    const loadingUser = useSelector((state: RootState) => state.user.isLoading);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<FormValues>({
        mode: "onTouched"
    });
    const submitForm = async (values: FormValues) => {
        await dispatch(signOut());
        await dispatch(login({
            email: values.email,
            password: values.password
        }));
    }

    useEffect(() => {
        console.log(errors);
    });

    return (
        <Card className="p-5 w-full lg:w-1/2 h-fit">
            <CardHeader>
                <h1 className="text-4xl font-medium justify-center">
                    Login
                </h1>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4 w-full">
                    <Input type="email" {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                        },
                    })} placeholder="Email"
                           isInvalid={errors.email !== undefined}
                           errorMessage={errors.email?.message}/>
                    <Input type="password" {...register("password", {
                        required: "Password is required",
                    })} placeholder="Password"
                           isInvalid={errors.password !== undefined}
                           errorMessage={errors.password?.message}/>
                    <Button color="primary" onClick={handleSubmit(submitForm)} isLoading={loadingUser}
                            isDisabled={!isValid}>
                        Login
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default Login;
