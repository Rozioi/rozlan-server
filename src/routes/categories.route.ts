import { FastifyInstance } from "fastify";
import { TRouteFunction } from "../utils/fastify-route";
import { CategoriesContoller } from "../controllers/categories.contoller";

export const CategoriesRoute: TRouteFunction = (fastify: FastifyInstance, _opts, done) => {
    fastify.get('/categories', CategoriesContoller.GetCategories as any);
    fastify.get('/categories/:name', CategoriesContoller.GetCategoriesByName as any);
    done();
}