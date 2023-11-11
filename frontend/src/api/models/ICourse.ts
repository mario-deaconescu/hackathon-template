/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ICourseQuestion } from './ICourseQuestion';
import type { ITeacher } from './ITeacher';

export type ICourse = {
    _id: string;
    teacher: ITeacher;
    name: string;
    chapters: Array<string>;
    content: string;
    questions: Array<ICourseQuestion>;
};

