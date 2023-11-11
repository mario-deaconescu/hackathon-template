import {Button, Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../redux/store.tsx";
import {useForm} from "react-hook-form";
import {signUpStudent} from "../redux/userSlice.ts";
import {AuthService} from "../api";

interface FormValues {
    email: string
    password: string
    name: string
}

const SignupUser = () => {
    const loadingUser = useSelector((state: RootState) => state.user.isLoading);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<FormValues>({
        mode: "onTouched"
    });
    const submitForm = (values: FormValues) => {
        dispatch(signUpStudent({
            email: values.email,
            password: values.password,
            name: values.name
        }));
    }
    const emailValidate = async (email: string) => {
        const response = await AuthService.userExists(email);
        if (response) {
            return 'Email already exists';
        } else {
            return true;
        }
    }
    return (
        <Card className="p-5 w-full h-fit">
            <CardHeader>
                <h1 className="text-4xl font-medium justify-center">
                    Sign Up as Student
                </h1>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4 w-full">
                    <Input type="text" {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                        },
                    })} placeholder="Name"
                           isInvalid={errors.name !== undefined}
                           errorMessage={errors.name?.message}/>
                    <Input type="email" {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                        },
                        validate: emailValidate,
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
                        Submit
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default SignupUser;
