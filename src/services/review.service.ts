import { db, GetAllData, insertRecord } from "../plugins/db";

export class ReviewService {
    static async getReviewsByUserId(id: number) {
        const { result, status, error } = await GetAllData(db, `SELECT * FROM reviews WHERE user_id = ?`, [id]);
        if (error) {
            throw new Error(`${error}`);
        }
        if (status === 1) { return result }
        return null
    };
    static async getReviewsByAuthorId(id:number){
        const { result , status, error} = await GetAllData(db,'SELECT * FROM reviews WHERE author_id = ?', [id]);
        if (error){
            throw error
        }
        if (status === 1){
            return result
        }
        return null
    };
    static async createReview(review: string, rating: number, user_id: number, author_id: number) {
        const createdAt = new Date().toISOString();

        try {
            const { result, status, error } = await insertRecord(db, `
            INSERT INTO reviews (user_id, author_id, rating, review, created_at)
            VALUES (?, ?, ?, ?, ?);
        `, [user_id, author_id, rating, review, createdAt]);
            if (error) {
                throw error;
            }
            if (status === 1) {
                return { message: 'Review created successfully', success: true };
            }
            return { message: 'Failed to create review', success: false };
        } catch (err: any) {
            return { message: err.message, success: false };
        }
    }

}