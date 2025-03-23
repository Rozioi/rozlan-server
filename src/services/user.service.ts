import { User } from "../controllers/user.controller";
import { db, GetData,createNewData } from "../plugins/db";
import { hashPassword } from "../utils/hash";


export class UserService {
    static async getUserByID(id: number) {
        try {
            const { result, status, error } = await GetData(db, 'SELECT * FROM users Where id = ?', [id]);

            if (error) {
                throw new Error(`${error}`);
            }
            return  result 
        }
        catch (error) {
            throw error;
        }
    };
    static async createNewUser(user: User){
        const {name,email,password,role,bio} = user;
        const hashed_password = await hashPassword(password);
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        try{
            const {result, status, error} = await createNewData(db, 'INSERT INTO users (name,email,password_hash,role,bio,rating,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)', [name,email,hashed_password,role,bio,1,now,now]);
        } 
        catch (error){
            throw error;
        }
    }
}