import {Request} from "express";
import {sign, verify} from "jsonwebtoken";
import {IUser} from "./src/models/users";
import * as process from "process";

const jwtSecret = process.env.JWT_SECRET || 'secret';

export interface TokenPayload {
    email: string;
    scopes: string[];
}

export interface JwtRequest extends Request {
    user: TokenPayload;
}

function extractToken(req: Request): string | null {
    // const authHeader = String(req.headers.authorization || '');
    // return authHeader.startsWith('Bearer ') ? authHeader.substring(7, authHeader.length) : null;
    // Get token from cookie
    return req.cookies['jwt'];
}

export function expressAuthentication(
    request: Request,
    securityName: string,
    scopes?: string[]
): Promise<TokenPayload> {
    if (securityName === "jwt") {
        const token = extractToken(request);

        return new Promise<TokenPayload>((resolve, reject) => {
            if (!token) {
                reject({
                    message: "No token provided",
                });
            } else {
                verify(token, jwtSecret, function (err: any, decoded: any) {
                    const payload = decoded as TokenPayload;
                    if (err) {
                        reject(err);
                    } else {
                        // Check if JWT contains all required scopes
                        for (let scope of scopes ?? []) {
                            if (!decoded.scopes.includes(scope)) {
                                reject({
                                    message: "JWT does not contain required scope.",
                                });
                            }
                        }
                        resolve(decoded);
                    }
                });
            }
        });
    }
    return Promise.reject(new Error("No authentication"));
}

export function createToken(user: IUser): string {
    const payload: TokenPayload = {
        email: user.email,
        scopes: [],
    };
    return sign(payload, jwtSecret, {expiresIn: '10 days'});
}
