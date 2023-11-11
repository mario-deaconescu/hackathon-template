/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseCreateModel } from '../models/CourseCreateModel';
import type { ICourse } from '../models/ICourse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CourseService {

    /**
     * @param email
     * @returns ICourse Ok
     * @throws ApiError
     */
    public static getSubscribedCourses(
        email: string,
    ): CancelablePromise<Array<ICourse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/subscribedCourses',
            query: {
                'email': email,
            },
        });
    }

    /**
     * @param chapters
     * @returns ICourse Ok
     * @throws ApiError
     */
    public static find(
        chapters: Array<string>,
    ): CancelablePromise<Array<ICourse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/find',
            query: {
                'chapters': chapters,
            },
        });
    }

    /**
     * @param email
     * @param requestBody
     * @returns any Ok
     * @throws ApiError
     */
    public static create(
        email: string,
        requestBody: CourseCreateModel,
    ): CancelablePromise<ICourse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/courses/create',
            query: {
                'email': email,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
