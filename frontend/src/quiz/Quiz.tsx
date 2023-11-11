import {IQuestion, QuestionsService} from "../api";
import {useEffect, useMemo, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Radio, RadioGroup} from "@nextui-org/react";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";

type Props = {
    chapters: string[];
    questionNumber: number;
}

const Quiz = ({chapters, questionNumber}: Props) => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [answerDict, setAnswerDict] = useState<Record<string, number>>({});
    const [correctAnswers, setCorrectAnswers] = useState<Record<string, number> | null>(null);

    useEffect(() => {
        QuestionsService.getRandomQuestions({chapters, numberOfQuestions: questionNumber}).then((response) => {
            setQuestions(response);
        });
    }, [chapters, questionNumber]);
    const selectAnswer = (questionNumber: number, answerNumber: number) => {
        setAnswerDict({...answerDict, [questionNumber]: answerNumber});
    }
    const submitQuiz = async () => {
        const body = Object.entries(answerDict).map(([questionId, answerNumber]) => ({
            questionId: questionId,
            answer: answerNumber
        }));
        QuestionsService.responseQuiz({
            responses: body
        }).then((response) => {
            const newCorrectAnswers: Record<string, number> = {};
            response.forEach((entry) => {
                newCorrectAnswers[entry.questionId] = entry.correctAnswer;
            });
            setCorrectAnswers(newCorrectAnswers);
        });
    };
    const getQuestionIcon = useMemo(() =>
            (questionId: string) => {
                if (correctAnswers) {
                    if (answerDict[questionId] === correctAnswers[questionId]) {
                        return <span color="green"><AiOutlineCheck/></span>;
                    } else {
                        return <span color="red"><AiOutlineClose/></span>;
                    }
                }
                return null;
            }
        , [correctAnswers]);
    return (
        <div className="flex flex-col gap-3">
            {
                questions.map((question, index) => (
                    <Card key={index} className="p-5">
                        <CardHeader>
                            <h1 className="text-4xl font-medium justify-center">
                                Question {index + 1}
                            </h1>
                        </CardHeader>
                        <CardBody>
                            <p>
                                {question.description}
                            </p>
                            <RadioGroup label="Select the answer"
                                        onValueChange={(answer) => selectAnswer(index, parseInt(answer))}>
                                {question.answers.map((answer, index) => (
                                    <Radio key={index} value={index.toString()}>
                                        <span>{answer}</span>
                                        {getQuestionIcon(question._id)}
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
