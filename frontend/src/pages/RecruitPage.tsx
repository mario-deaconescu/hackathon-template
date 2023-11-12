import {Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {AiOutlineSearch} from "react-icons/ai";
import {Key, useCallback, useState} from "react";
import {IStudent, RecruitService} from "../api";
import {useNavigate} from "react-router-dom";

type FormValues = {
    query: string
}

const columns = [
    {uid: 'name', name: 'NAME'},
    {uid: 'email', name: 'EMAIL'},
    {uid: 'desirability', name: 'SCORE'},
];

const RecruitPage = () => {
    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<FormValues>({
        criteriaMode: "all",
        mode: "onTouched"
    });
    const [candidates, setCandidates] = useState<{
        student: IStudent,
        desirability: number,
    }[] | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitQuery = async (values: FormValues) => {
        setLoading(true);
        const result = await RecruitService.getQuery(values.query);
        setCandidates(result.candidates);
        setLoading(false);
    }
    const renderCell = useCallback((candidate: {
        student: IStudent,
        desirability: number,
    }, columnKey: Key) => {
        switch (columnKey) {
            case "name":
                return candidate.student.name;
            case "email":
                return candidate.student.email;
            case "desirability":
                return candidate.desirability * 1000;
        }
    }, []);
    return (
        <div className="p-5 flex-col">
            <h1 className="text-4xl font-medium justify-center mb-3">
                Recruit Candidates
            </h1>
            <form className="flex flex-col items-center justify-center gap-3 mb-3">
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
            {candidates !== null &&
                <Table aria-label="Recruit table"
                       onRowAction={(key: Key) => {
                           navigate(`/profile/student/${candidates?.find(candidate => candidate.student._id === key)?.student._id ?? ""}`);
                       }}>
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={candidates}>
                        {(item) => (
                            <TableRow key={item.student._id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            }
        </div>
    );
};

export default RecruitPage;
