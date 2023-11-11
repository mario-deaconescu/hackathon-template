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
        questionId: number,
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
        requestBody: IQuestion,
    ): CancelablePromise<IQuestion> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/questions/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
