import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ReviewService } from "../services/review.service";

export const ReviewController = {
    async GetUserReviews(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
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
}