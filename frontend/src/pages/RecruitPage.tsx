import {Button, Textarea} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {AiOutlineSearch} from "react-icons/ai";
import {useState} from "react";

type FormValues = {
    query: string
}

const RecruitPage = () => {
    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<FormValues>({
        criteriaMode: "all",
        mode: "onTouched"
    });
    const [loading, setLoading] = useState(false);
    const submitQuery = async (values: FormValues) => {
        console.log(values);
    }
    return (
        <div className="p-5 flex-col">
            <h1 className="text-4xl font-medium justify-center mb-3">
                Recruit Candidates
            </h1>
            <form className="flex flex-col items-center justify-center gap-3">
                <Textarea {...register("query", {
                    required: "Query is required",
                    minLength: {
                        value: 10,
                        message: "Query must be at least 10 characters",
                    }
                })} placeholder="Query"
                          isInvalid={errors.query !== undefined}
                          errorMessage={errors.query?.message}/>
                <Button color="primary" onClick={handleSubmit(submitQuery)} isLoading={loading} isDisabled={!isValid}
                        endContent={<AiOutlineSearch/>}>
                    Search
                </Button>
            </form>
        </div>
    );
};

export default RecruitPage;
