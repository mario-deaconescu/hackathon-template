/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IQuestion } from '../models/IQuestion';
import type { Omit_IQuestion__id_ } from '../models/Omit_IQuestion__id_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionsService {

    /**
     * @param email
     * @param requestBody
     * @returns number Ok
     * @throws ApiError
     */
    public static getTotalQuestions(
        email: string,
        requestBody: {
            chapters: Array<string>;
        },
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/questions/totalQuestions',
            query: {
                'email': email,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

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
            url: '/questions/{questionId}',
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
        requestBody: Omit_IQuestion__id_,
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
            email: string;
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

    /**
     * @returns void
     * @throws ApiError
     */
    public static startGeneration(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/questions/startGeneration',
        });
    }

}
