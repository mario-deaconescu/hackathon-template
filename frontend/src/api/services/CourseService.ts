/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseCreateModel } from '../models/CourseCreateModel';
import type { CourseWithSubscribers } from '../models/CourseWithSubscribers';
import type { ICourse } from '../models/ICourse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CourseService {

    /**
     * @param email
     * @returns CourseWithSubscribers Ok
     * @throws ApiError
     */
    public static getSubscribedCourses(
        email: string,
    ): CancelablePromise<Array<CourseWithSubscribers>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/subscribedCourses',
            query: {
                'email': email,
            },
        });
    }

    /**
     * @param requestBody
     * @returns CourseWithSubscribers Ok
     * @throws ApiError
     */
    public static find(
        requestBody: {
            chapters: Array<string>;
        },
    ): CancelablePromise<Array<CourseWithSubscribers>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/courses/find',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param email
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static enroll(
        email: string,
        requestBody: {
            courses: Array<string>;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/courses/enroll',
            query: {
                'email': email,
            },
            body: requestBody,
            mediaType: 'application/json',
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

    /**
     * @param email
     * @returns CourseWithSubscribers Ok
     * @throws ApiError
     */
    public static myCourses(
        email: string,
    ): CancelablePromise<Array<CourseWithSubscribers>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/myCourses',
            query: {
                'email': email,
            },
        });
    }

}
