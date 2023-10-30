import {Controller, Get, Path, Route, Tags} from "tsoa";
import {IUser} from "../models/users";

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
    @Get("{userId}")
    public getUser(@Path() userId: string): IUser {
        return {
            name: "Mari",
            email: "mari@mari.com",
            password: "123456",
            id: userId,
        }
    }

}
