import { FastifyReply, FastifyRequest } from "fastify";
import { ReviewService } from "../services/review.service";
import { UserService } from "../services/user.service";

export const ReviewController = {
    async getReviewsByUserId(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        const id = parseInt(req.params.id);
        try{
            if (isNaN(id)){
                return reply.status(400).send({error: 'Invalid parameters'});
            }
            const reviews = await ReviewService.getReviewsByUserId(id);
            if (!reviews){
                return reply.status(404).send({error: "Not found this user"})
            }
            return reply.send({reviews: reviews});

        } catch(error){
            return reply.status(500).send({error});
        }
    },
    async createReview(req: FastifyRequest<{Body: {review: string, rating: number, user_id: number, author_id: number}}>, reply: FastifyReply) {
        try{
            const { review, rating, user_id, author_id } = req.body;
            if (!review || !rating || !user_id || !author_id) {
                return reply.status(400).send({ error: 'Invalid parameters' });
            }
            if (isNaN(rating) || isNaN(user_id) || isNaN(author_id)) {
                return reply.status(400).send({ error: 'Invalid parameters' });
            }
            if (rating < 1 || rating > 5) {
                return reply.status(400).send({ error: 'Rating must be between 1 and 5' });
            }
            if (user_id === author_id) {
                return reply.status(400).send({ error: 'You cannot review yourself' });
            }
            const user = await UserService.getUserByID(user_id);
            const author = await UserService.getUserByID(author_id);
    
            if (!user) {
                return reply.status(404).send({ error: 'User not found' });
            }
    
            if (!author) {
                return reply.status(404).send({ error: 'Author not found' });
            }
    
            // Создание отзыва
            const result = await ReviewService.createReview(review, rating, user_id, author_id);
            return reply.send(result);
        } catch (error){
            return reply.status(500).send(error);
        }
    },
    async getReviewsByAuthorId(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        const id = parseInt(req.params.id);
        try{
            if (isNaN(id)){
                return reply.status(400).send({error: 'Invalid parameters'});
            };
            const result = await ReviewService.getReviewsByAuthorId(id);
            if (!result){
                return reply.status(404).send({error: 'Not found this author'});
            }
            return reply.send(result);
        } catch(error){
            return reply.status(500).send(error);
        }

    }
}