import {useForm} from "react-hook-form";
import {Button, Input} from "@nextui-org/react";
import {useState} from "react";

interface FormValues {
    name: string
    email: string
    password: string,
    image: Blob
}

const SignupPage = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormValues>({
        mode: "onTouched"
    });
    const [loading, setLoading] = useState(false);
    const submitForm = async (values: FormValues) => {
        console.log(values);
    }
    return (
        <form>
            <Input type="text" {...register("name", {
                required: "Name is required",
                minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
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
            })} placeholder="Email"
                   isInvalid={errors.email !== undefined}
                   errorMessage={errors.email?.message}/>
            <Input type="password" {...register("password", {
                required: "Password is required",
            })} placeholder="Password"
                   isInvalid={errors.password !== undefined}
                   errorMessage={errors.password?.message}/>
            <input type="file" {...register("image")}/>
            <Button color="primary" onClick={handleSubmit(submitForm)} isDisabled={!isValid}>
                Signup
            </Button>
        </form>
    );
};

export default SignupPage;
