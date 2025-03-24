import { User } from "../controllers/user.controller";
import { db, GetData, insertRecord } from "../plugins/db";
import { hashPassword } from "../utils/hash";


export class UserService {
    static async increaseRating(id: number, rating: number, oldRating: number) {
        try {
            const newRating = oldRating + rating;
            const { result, status, error } = await insertRecord(
                db,
                'UPDATE users SET rating = ? WHERE id = ?',
                [newRating, id]
            );
           if (error) {
                throw new Error(`Database error: ${error}`);
            }
           
            const updatedUser = await UserService.getUserByID(id);
            return updatedUser;
    
        } catch (error) {
            console.error("Error updating rating:", error);
            throw new Error("Failed to update rating");
        }
    };
    static async deleteAccount(id:number){
        try{
            const {result,status,error} = await insertRecord(db, 'DELETE FROM users WHERE id = ?', [id]);
            if (error) {throw new Error(`Database error: ${error}`);};
            if (status == 1){return result;}
            return null;
        } catch(error){
            throw new Error("Failed to delete account")
        }
    } ;
    static async toogleAccountStatus(id:number, newStatus:boolean){
        try{
            const {result , status, error} = await insertRecord(db, 'UPDATE users SET is_active = ? WHERE id = ?', [newStatus ? 1 : 0, id]);
            if (error) {throw new Error(`Database error: ${error}`);};
            if (status == 1){return result;}
            return null;
        } catch (error){
            throw new Error("Failed to update status")
        }
    }
    
    static async getUserByID(id: number) {
        try {
            const { result, status, error } = await GetData(db, 'SELECT * FROM users Where id = ?', [id]);
            if (error) {
                throw new Error(`${error}`);
            }
            return result as User;
        }
        catch (error) {
            throw new Error("Failed to give account")
        }
    };
    static async createNewUser(user: User) {
        const { name, email, password, role, bio } = user;
        const hashed_password = await hashPassword(password);
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        try {
            const { result, status, error } = await insertRecord(db, 'INSERT INTO users (name,email,password_hash,role,bio,rating,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)', [name, email, hashed_password, role, bio, 1, now, now]);
        }
        catch (error) {
            throw error;
        }
    }
}