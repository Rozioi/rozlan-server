import { FastifyInstance } from "fastify";
import { TRouteFunction } from "../utils/fastify-route";
import { ReviewController } from "../controllers/review.controller";

export const ReviewRoute: TRouteFunction = (fastify: FastifyInstance, _opts,done) => {
    fastify.get('/reviews/user/:id', ReviewController.getReviewsByUserId as any);
    fastify.get('/reviews/author/:id', ReviewController.getReviewsByAuthorId as any);
    fastify.post('/review/create', ReviewController.createReview as any);
    done();
}