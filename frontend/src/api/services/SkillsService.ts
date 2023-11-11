/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ISkill } from '../models/ISkill';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SkillsService {

    /**
     * @param requestBody
     * @returns any Ok
     * @throws ApiError
     */
    public static createSkill(
        requestBody: ISkill,
    ): CancelablePromise<ISkill> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/skills/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns ISkill Ok
     * @throws ApiError
     */
    public static getAllSkills(): CancelablePromise<Array<ISkill>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/skills/all',
        });
    }

    /**
     * @param skillName
     * @returns any Ok
     * @throws ApiError
     */
    public static getChapters(
        skillName: string,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/skills/{skillName}',
            path: {
                'skillName': skillName,
            },
        });
    }

}
