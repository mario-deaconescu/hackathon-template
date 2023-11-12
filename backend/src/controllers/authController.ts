import {Body, Controller, Delete, Get, Post, Request, Route, Security, Tags} from "tsoa";
import Users, {IStudent, IUser, Recruiter, Student, Teacher, UserCreateModel, UserLoginModel} from "../models/users";
import {createToken, JwtRequest} from "../../authentication";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
    @Get("currentUser")
    @Security("jwt")
    public async currentUser(@Request() request: JwtRequest): Promise<IUser | void> {
        const user = await Users.findOne({email: request.user.email});
        console.log(request.cookies);
        console.log(request.user);
        //console.log();
        if (!user) {
            this.setStatus(401);
            return;
        }
        return user;
    }

    @Post("login")
    public async login(@Body() model: UserLoginModel): Promise<IUser | null> {
        console.log(model);
        const user = await Users.findOne({email: model.email});
        console.log(user);
        if (!user) {
            this.setStatus(401);
            return null;
        }
        const isValidPassword = await user.isValidPassword(model.password);
        console.log(isValidPassword);
        if (!isValidPassword) {
            this.setStatus(401);
            return null;
        }
        this.setHeader('Set-Cookie', `jwt=${createToken(user)}; HttpOnly; SameSite=None; Secure;`);
        this.setStatus(202);
        return user;
    }

    @Post("signupStudent")
    public async signupStudent(@Body() user: UserCreateModel): Promise<IStudent | void> {
        const newUser = new Student(user);
        const savedUser = await newUser.save();
        if (!savedUser) {
            this.setStatus(500);
            return;
        }
        this.setHeader('Set-Cookie', `jwt=${createToken(savedUser)}; HttpOnly; SameSite=None; Secure;`);
        this.setStatus(202);
        return savedUser;
    }

    @Post("signupRecruiter")
    public async signupRecruiter(@Body() user: UserCreateModel): Promise<IUser | void> {
        const newUser = new Recruiter(user);
        const savedUser = await newUser.save();
        if (!savedUser) {
            this.setStatus(500);
            return;
        }
        this.setHeader('Set-Cookie', `jwt=${createToken(savedUser)}; HttpOnly; SameSite=None; Secure;`);
        this.setStatus(202);
        return savedUser;
    }

    @Post("signupTeacher")
    public async signupTeacher(@Body() user: UserCreateModel): Promise<IUser | void> {
        const newUser = new Teacher(user);
        const savedUser = await newUser.save();
        if (!savedUser) {
            this.setStatus(500);
            return;
        }
        this.setHeader('Set-Cookie', `jwt=${createToken(savedUser)}; HttpOnly; SameSite=None; Secure;`);
        this.setStatus(202);
        return savedUser;
    }

    @Delete("logout")
    public async logout(): Promise<void> {
        this.setHeader('Set-Cookie', `jwt=; HttpOnly; SameSite=None; Secure;`);
        this.setStatus(200);
    }

    @Get("exists/{email}")
    public async userExists(email: string): Promise<boolean> {
        // Check if user exists
        const user = await Users.findOne({email: email});
        return user !== null;
    }

}
