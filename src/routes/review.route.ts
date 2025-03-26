import { FastifyInstance } from "fastify";
import { TRouteFunction } from "../utils/fastify-route";
import { ReviewController } from "../controllers/review.controller";

export const ReviewRoute: TRouteFunction = (fastify: FastifyInstance, _opts,done) => {
    fastify.get('/reviews/:id', ReviewController.GetUserReviews as any);
    done();
}