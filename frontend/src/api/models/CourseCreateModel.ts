/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ICourseQuestion } from './ICourseQuestion';

export type CourseCreateModel = {
    name: string;
    content: string;
    chapters: Array<string>;
    questions: Array<ICourseQuestion>;
};

