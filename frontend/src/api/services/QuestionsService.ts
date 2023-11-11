/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IQuestion } from '../models/IQuestion';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionsService {

    /**
     * @param questionId
     * @returns any Ok
     * @throws ApiError
     */
    public static getQuestion(
        questionId: string,
    ): CancelablePromise<IQuestion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/questions/get/{questionId}',
            path: {
                'questionId': questionId,
            },
        });
    }

    /**
     * @param requestBody
     * @returns any Ok
     * @throws ApiError
     */
    public static createQuestion(
        requestBody: IQuestion,
    ): CancelablePromise<IQuestion> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/questions/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns IQuestion Ok
     * @throws ApiError
     */
    public static getRandomQuestions(
        requestBody: {
            numberOfQuestions: number;
            chapters: Array<string>;
        },
    ): CancelablePromise<Array<IQuestion>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/questions/randomQuiz',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any Ok
     * @throws ApiError
     */
    public static responseQuiz(
        requestBody: {
            responses: Array<{
                answer: number;
                questionId: string;
            }>;
        },
    ): CancelablePromise<Array<{
        correctAnswer: number;
        isCorrect: boolean;
        questionId: string;
    }>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/questions/responseQuiz',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
