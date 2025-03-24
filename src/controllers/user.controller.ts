import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: string;
    bio?: string;
    is_active?: boolean;
    rating?: number;
    created_at?: Date;
    updated_at?: Date;
}



export const userController = {
    async increaseRating(req: FastifyRequest<{ Params: { id: string, amount: string } }>, reply: FastifyReply) {
        const id = parseInt(req.params.id);
        const rating = parseFloat(req.params.amount);
        if (isNaN(id) || isNaN(rating)) {
            return reply.status(400).send({ error: "Invalid parameters" });
        }
        const user: User = await UserService.getUserByID(id);
        if (!user) {
            return reply.status(404).send({ error: "User not found" });
        }
        const updatedUser = await UserService.increaseRating(id, rating, user.rating? user.rating : 0);
        if (!updatedUser) {
            return reply.status(500).send({ error: "Failed to update user rating" });
        }
        return reply.send({ message: "Rating increased", user: updatedUser });
    },

    async toogleAccountStatus(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply){
        const id = parseInt(req.params.id);
        if (isNaN(id)){ 
            return reply.status(400).send({error: "Invalid parameters"});
        }
        const user = await UserService.getUserByID(id);
        if (!user){
            return reply.status(404).send({error: "User not found"});
        }
        const newStatus = !user.is_active;
        await UserService.toogleAccountStatus(id, newStatus);
        return reply.send({message: `User account ${newStatus ? "activated" : "deactivated"} successfully.`,
            newStatus})
    },
    async deleteAccount(req: FastifyRequest<{Params: {id: string}}>,reply: FastifyReply) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return reply.status(400).send({error: "Invalid parameters"});
        }
        const user = await UserService.getUserByID(id);
        if (!user){
            return reply.status(404).send({error: "User not found"});
        }
        await UserService.deleteAccount(id);
        return reply.send({message: "User deleted successfully"});
    },
    async getUserById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return reply.status(400).send({error: "Invalid parameters"});
        }
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
