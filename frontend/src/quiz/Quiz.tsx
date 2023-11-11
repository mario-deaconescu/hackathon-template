import {IQuestion, QuestionsService} from "../api";
import {useEffect, useMemo, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Radio, RadioGroup} from "@nextui-org/react";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";

type Props = {
    chapters: string[];
    questionNumber: number;
}

const Quiz = ({chapters, questionNumber}: Props) => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [answerDict, setAnswerDict] = useState<Record<string, number>>({});
    const [correctAnswers, setCorrectAnswers] = useState<Record<string, number> | null>(null);
    const currentUser = useSelector((state: RootState) => state.user.user);
    useEffect(() => {
        QuestionsService.getRandomQuestions({chapters, numberOfQuestions: questionNumber}).then((response) => {
            setQuestions(response);
        });
    }, [chapters, questionNumber]);
    const selectAnswer = (questionId: string, answerNumber: number) => {
        setAnswerDict({...answerDict, [questionId]: answerNumber});
    }
    const submitQuiz = async () => {
        const body = Object.entries(answerDict).map(([questionId, answerNumber]) => ({
            questionId: questionId,
            answer: answerNumber
        }));
        QuestionsService.responseQuiz({
            responses: body,
            email: currentUser?.email || ''
        }).then((response) => {
            const newCorrectAnswers: Record<string, number> = {};
            response.forEach((entry) => {
                newCorrectAnswers[entry.questionId] = entry.correctAnswer;
            });
            setCorrectAnswers(newCorrectAnswers);
        });
    };
    const getQuestionIcon = useMemo(() =>
            (questionId: string, index: number) => {
                if (correctAnswers) {
                    if (answerDict[questionId] === index) {
                        if (correctAnswers[questionId] === index) {
                            return <AiOutlineCheck className="text-green-500 inline align-middle ml-1"/>;
                        } else {
                            return <AiOutlineClose className="text-red-500 inline align-middle ml-1"/>;
                        }
                    } else if (index === correctAnswers[questionId]) {
                        return <AiOutlineCheck className="text-green-500 inline align-middle ml-1"/>;
                    }
                }
                return null;
            }
        , [correctAnswers]);
    return (
        <div className="flex flex-col gap-3">
            {
                questions.map((question, questionIndex) => (
                    <Card key={questionIndex} className="p-5">
                        <CardHeader>
                            <h1 className="text-4xl font-medium justify-center">
                                Question {questionIndex + 1}
                            </h1>
                        </CardHeader>
                        <CardBody>
                            <p>
                                {question.description}
                            </p>
                            <RadioGroup label="Select the answer"
                                        onValueChange={(answer) => selectAnswer(question._id, parseInt(answer))}>
                                {question.answers.map((answer, index) => (
                                    <Radio key={index} value={index.toString()}>
                                        <span>{answer}</span>
                                        {getQuestionIcon(question._id, index)}
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </CardBody>
                        <CardFooter>
                            <span className="opacity-50">Chapter: {question.chapter}</span>
                        </CardFooter>
                    </Card>
                ))
            }
            <Button color="primary" onClick={submitQuiz} isDisabled={Object.keys(answerDict).length < questionNumber}>
                Submit
            </Button>
        </div>
    );
};

export default Quiz;
