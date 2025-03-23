import Fastify, { fastify } from "fastify";
import { FastifyRoute } from "./utils/fastify-route";
import fastifyCors from "@fastify/cors";
import { UserRoutes } from "./routes/user.route";
export const app = Fastify({
	logger: true,
});
app.register(fastifyCors, {origin: '*'});
FastifyRoute(
	{
		fastify: app,
	},
	UserRoutes,
	{ prefix: "/api/v1/"}
)