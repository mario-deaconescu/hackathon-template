/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IStudent } from '../models/IStudent';
import type { IUser } from '../models/IUser';
import type { UserCreateModel } from '../models/UserCreateModel';
import type { UserLoginModel } from '../models/UserLoginModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * @returns any Ok
     * @throws ApiError
     */
    public static currentUser(): CancelablePromise<IUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/currentUser',
        });
    }

    /**
     * @param requestBody
     * @returns any Ok
     * @throws ApiError
     */
    public static login(
        requestBody: UserLoginModel,
    ): CancelablePromise<IUser | null> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any Ok
     * @throws ApiError
     */
    public static signupStudent(
        requestBody: UserCreateModel,
    ): CancelablePromise<IStudent> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signupStudent',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public static logout(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/auth/logout',
        });
    }

    /**
     * @param email
     * @returns boolean Ok
     * @throws ApiError
     */
    public static userExists(
        email: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/exists/{email}',
            path: {
                'email': email,
            },
        });
    }

}
