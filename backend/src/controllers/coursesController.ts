import {Body, Get, Post, Query, Route, Tags} from "tsoa";
import Courses, {CourseCreateModel, CourseWithSubscribers, ICourse} from "../models/courses";
import {Student, Teacher} from "../models/users";
import {Controller} from "@tsoa/runtime";

@Route("courses")
@Tags("Course")
export class CourseController extends Controller {

    @Get("subscribedCourses")
    public async getSubscribedCourses(@Query() email: string): Promise<CourseWithSubscribers[]> {
        const student = await Student.findOne({email: email});
        if (!student) {
            this.setStatus(403);
            return [];
        }
        const courses = await Courses.find({_id: {$in: student.subscribedCourses}}).populate('teacher');
        return await Promise.all(courses.map(async (course): Promise<CourseWithSubscribers> => {
            return {
                name: course.name,
                content: course.content,
                chapters: course.chapters,
                questions: course.questions,
                teacher: course.teacher,
                subscribers: await Student.countDocuments({subscribedCourses: course._id}),
            };
        }));
    }

    @Post("find")
    public async find(@Body() body: { chapters: string[] }): Promise<CourseWithSubscribers[]> {
        console.log("Find", body.chapters);
        const courses = await Courses.find({chapters: {$in: body.chapters}}).populate('teacher');
        return await Promise.all(courses.map(async (course): Promise<CourseWithSubscribers> => {
            return {
                name: course.name,
                content: course.content,
                chapters: course.chapters,
                questions: course.questions,
                teacher: course.teacher,
                subscribers: await Student.countDocuments({subscribedCourses: course._id}),
            };
        }));
    }

    @Post("enroll")
    public async enroll(@Body() body: { courses: string[] }, @Query() email: string): Promise<void> {
        const student = await Student.findOne({email: email});
        if (!student) {
            this.setStatus(403);
            return;
        }
        const courseIds = await Courses.find({name: {$in: body.courses}});
        student.subscribedCourses = [...new Set([...student.subscribedCourses, ...courseIds.map(course => course._id as unknown as string)])];
        await student.save();
    }

    @Post("create")
    public async create(@Body() model: CourseCreateModel, @Query() email: string): Promise<ICourse | void> {
        const teacher = await Teacher.findOne({email: email});
        if (!teacher) {
            this.setStatus(403);
            return;
        }
        const course = new Courses({
            name: model.name,
            content: model.content,
            chapters: model.chapters,
            questions: model.questions,
            teacher: teacher._id,
        });
        await course.save();
        return course;
    }

    @Get("myCourses")
    public async myCourses(@Query() email: string): Promise<CourseWithSubscribers[]> {
        console.log("Mycourses", email);
        const teacher = await Teacher.findOne({email: email});
        if (!teacher) {
            this.setStatus(403);
            return [];
        }
        const courses = await Courses.find({teacher: teacher._id}).populate('teacher');
        return await Promise.all(courses.map(async (course): Promise<CourseWithSubscribers> => {
            return {
                name: course.name,
                content: course.content,
                chapters: course.chapters,
                questions: course.questions,
                teacher: course.teacher,
                subscribers: await Student.countDocuments({subscribedCourses: course._id}),
            };
        }));
    }
}
