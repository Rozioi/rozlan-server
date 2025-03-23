
import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controller"
import { TRouteFunction } from "../utils/fastify-route";

export const UserRoutes: TRouteFunction = (fastify: FastifyInstance,_opts, done) => {
    fastify.get('/:id', userController.getUserById);
    fastify.post('/', userController.createNewUser);
    done();
}
