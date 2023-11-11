import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Select,
    Selection,
    SelectItem,
    SelectSection,
    Textarea
} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {RootState} from "../redux/store.tsx";
import {useSelector} from "react-redux";
import {CourseService, SkillsService} from "../api";
import {useEffect, useMemo, useState} from "react";

type Props = {
    isOpen: boolean,
    onOpenChange: (open: boolean) => void,
    onAdd: () => Promise<void> | void,
}

interface FormValues {
    name: string,
    content: string,
}

const CourseModal = ({isOpen, onOpenChange, onAdd}: Props) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const {register, handleSubmit, formState: {isValid, errors}, reset} = useForm<FormValues>({
        criteriaMode: "all",
        mode: "onTouched",
    });
    const [chapters, setChapters] = useState<Selection>(new Set([]));
    const [availableChapters, setAvailableChapters] = useState<{ name: string, chapters: string[] }[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        SkillsService.getAllSkills().then((response) => {
            setAvailableChapters(response.map((skill) => ({
                name: skill.name,
                chapters: skill.chapters
            })));
        });
    }, []);

    const submit = useMemo(() => async (values: FormValues) => {
        setLoading(true);
        await CourseService.create(currentUser?.email ?? '', {
            name: values.name,
            content: values.content,
            chapters: Array.from(chapters) as string[],
            questions: [],
        });
        setLoading(false);
    }, [chapters]);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h1 className="text-4xl font-medium justify-center">
                                Create Course
                            </h1>
                        </ModalHeader>
                        <ModalBody>
                            <form className="flex flex-col gap-3 pb-5">
                                <Input {...register("name", {required: true})} placeholder="Name"/>
                                <Textarea {...register("content", {required: true})} placeholder="Content"/>
                                <Select selectionMode="multiple" placeholder="Chapters" onSelectionChange={setChapters}>
                                    {availableChapters.map((skill) => (
                                        <SelectSection key={skill.name} title={skill.name}>
                                            {skill.chapters.map((chapter) => (
                                                <SelectItem key={chapter} value={chapter}>
                                                    {chapter}
                                                </SelectItem>
                                            ))}
                                        </SelectSection>
                                    ))}
                                </Select>
                                <Button onClick={handleSubmit(submit)} color="primary" isDisabled={!isValid}
                                        isLoading={loading}>Submit</Button>
                            </form>
                        </ModalBody>
                    </>
                )
                }
            </ModalContent>
        </Modal>
    );
};

export default CourseModal;
