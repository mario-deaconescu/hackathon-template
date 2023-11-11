import {Body, Get, Post, Query, Route, Tags} from "tsoa";
import Courses, {CourseCreateModel, ICourse} from "../models/courses";
import {Student, Teacher} from "../models/users";
import {Controller} from "@tsoa/runtime";

@Route("courses")
@Tags("Course")
export class CourseController extends Controller {

    @Get("subscribedCourses")
    public async getSubscribedCourses(@Query() email: string): Promise<ICourse[]> {
        const student = await Student.findOne({email: email});
        if (!student) {
            this.setStatus(403);
            return [];
        }
        return Courses.find({_id: {$in: student.subscribedCourses}}).populate('teacher');
    }

    @Get("find")
    public async find(@Query() chapters: string[]): Promise<ICourse[]> {
        return Courses.find({chapters: {$in: chapters}}).populate('teacher');
    }

    @Post("create")
    public async create(@Body() model: CourseCreateModel, @Query() email: string): Promise<ICourse | void> {
        const teacher = await Teacher.findOne({email: email});
        if (!teacher) {
            this.setStatus(403);
            return;
        }
        const course = new Courses({
            content: model.content,
            chapters: model.chapters,
            questions: model.questions,
            teacher: teacher._id,
        });
        await course.save();
        return course;
    }
}
