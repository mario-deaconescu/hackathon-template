/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatisticsResponse } from '../models/StatisticsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StatisticsService {

    /**
     * @param id
     * @returns any Ok
     * @throws ApiError
     */
    public static getUserStatistics(
        id: string,
    ): CancelablePromise<StatisticsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/statistics/getUserStatistics',
            query: {
                'id': id,
            },
        });
    }

}
