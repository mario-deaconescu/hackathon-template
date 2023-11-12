/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RecruitResult } from '../models/RecruitResult';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RecruitService {

    /**
     * @param query
     * @returns RecruitResult Ok
     * @throws ApiError
     */
    public static getQuery(
        query: string,
    ): CancelablePromise<RecruitResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/recruit/query',
            query: {
                'query': query,
            },
        });
    }

}
