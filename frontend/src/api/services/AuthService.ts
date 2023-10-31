/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
    public static getUser(): CancelablePromise<IUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/getUser',
        });
    }

    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static login(
        requestBody: UserLoginModel,
    ): CancelablePromise<void> {
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
    public static signup(
        requestBody: UserCreateModel,
    ): CancelablePromise<IUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
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

}
