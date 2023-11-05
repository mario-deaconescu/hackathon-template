import {Body, Controller, Delete, Get, Post, Request, Route, Security, Tags} from "tsoa";
import Users, {IUser, UserCreateModel, UserLoginModel} from "../models/users";
import {createToken, JwtRequest} from "../../authentication";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
    @Get("currentUser")
    @Security("jwt")
    public async currentUser(@Request() request: JwtRequest): Promise<IUser | void> {
        const user = await Users.findOne({email: request.user.email});
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
        if (!user) {
            this.setStatus(401);
            return null;
        }
        const isValidPassword = await user.isValidPassword(model.password);
        if (!isValidPassword) {
            this.setStatus(401);
            return null;
        }
        this.setHeader('Set-Cookie', `jwt=${createToken(user)}; HttpOnly; SameSite=None; Secure;`);
        this.setStatus(202);
        return user;
    }

    @Post("signup")
    public async signup(@Body() user: UserCreateModel): Promise<IUser | void> {
        const newUser = new Users(user);
        const savedUser = await newUser.save();
        if (!savedUser) {
            this.setStatus(500);
            return;
        }
        return savedUser;
    }

    @Delete("logout")
    public async logout(): Promise<void> {
        this.setHeader('Set-Cookie', `jwt=; HttpOnly; SameSite=None; Secure;`);
        this.setStatus(200);
    }

}
