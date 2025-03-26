import { db, GetAllData } from "../plugins/db";

export class ReviewService {
    static async getReviewsByUserId(id:number) {
        const {result, status, error} = await GetAllData(db, `SELECT * FROM reviews WHERE user_id = ?`, [id]);
        if (error){
            throw new Error(`${error}`);
        }
        if (status === 1){return result}
        return null
    }
}