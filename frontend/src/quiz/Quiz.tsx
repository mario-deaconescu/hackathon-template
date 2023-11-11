import {IQuestion} from "../api";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Radio, RadioGroup} from "@nextui-org/react";

type Props = {
    chapters: string[];
    questionNumber: number;
}

const Quiz = ({chapters, questionNumber}: Props) => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [answerDict, setAnswerDict] = useState<Record<number, number>>({});

    useEffect(() => {
        setQuestions([{
            chapter: "India",
            description: "What is the capital of India?",
            answers: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
            correctAnswer: 0
        },
            {
                chapter: "India",
                description: "What is the capital of India?",
                answers: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
                correctAnswer: 0
            }]);
    }, []);
    const selectAnswer = (questionNumber: number, answerNumber: number) => {
        setAnswerDict({...answerDict, [questionNumber]: answerNumber});
    }
    const submitQuiz = () => {
        console.log(answerDict);
    };
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
                                        {answer}
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
