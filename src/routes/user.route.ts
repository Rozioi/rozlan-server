
import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controller"
import { TRouteFunction } from "../utils/fastify-route";

export const UserRoutes: TRouteFunction = (fastify: FastifyInstance,_opts, done) => {
    fastify.get('/users/:id', userController.getUserById);
    fastify.put('/users/:id/:amount', userController.increaseRating);
    fastify.put('/users/:id/active', userController.toogleAccountStatus);
    fastify.delete('/users/:id', userController.deleteAccount);
    fastify.post('/users/', userController.createNewUser);
    done();
}
