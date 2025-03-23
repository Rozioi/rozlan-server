import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: string;
    bio?: string; 
    rating?: number; 
    created_at?: Date; 
    updated_at?: Date; 
}



export const userController = {

    async getUserById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const id = parseInt(req.params.id);
        const user = await UserService.getUserByID(id);
        if (!user) {
            reply.status(404).send('Not Found')
        }
        return reply.send(user);
    },
    async createNewUser(req: FastifyRequest<{ Body: User }>, reply: FastifyReply) {
        const user = req.body;
        try {
            await UserService.createNewUser(user);
            return reply.send('User Created');
        } catch (error) {
            return reply.status(500).send('Internal Server Error');
        }

    }
};
