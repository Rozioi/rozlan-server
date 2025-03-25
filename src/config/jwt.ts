import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { config } from "./env";

const jwt_secret: Secret  = config.JWT_SECRET || "supersecret"; 
export function generateToken(payload: object): string{
    return jwt.sign(payload, jwt_secret, {    expiresIn: '1h'});

}

export function verifyToken(token: string): JwtPayload | null{
    try{
        const decoded = jwt.verify(token, jwt_secret);
        return typeof decoded === "string" ? null : (decoded as JwtPayload);

    } catch (error){
        throw error
    }
}