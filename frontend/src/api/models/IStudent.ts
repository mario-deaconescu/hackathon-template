/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IStudent = {
    name: string;
    email: string;
    password: string;
    roles: Array<string>;
    type: string;
    completedQuestions: Array<{
        date: string;
        id: string;
    }>;
    totalQuestions: Record<string, number>;
    subscribedCourses: Array<string>;
};

