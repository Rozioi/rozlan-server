import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllData } from "../plugins/db";
import { CategoriesService } from "../services/categories.service";

export const CategoriesContoller = {
    async GetCategories(req: FastifyRequest, reply: FastifyReply){
        try{
            const Categories = await CategoriesService.GetCategories();
            if (!Categories){
                return reply.status(400).send({error: 'Not found this categories'})
            }
            return reply.status(200).send({Categories: Categories})
        } catch(error){
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    },
    async GetCategoriesByName(req:FastifyRequest<{Params: {name: string}}>, reply: FastifyReply){
        const name = req.params.name;
        try{
            if(!name){  
                return reply.status(400).send({error: 'Invalid parameters'})
            }
            const Categories = await CategoriesService.GetCategoriesByName(name);
            if (!Categories){
                return reply.status(404).send({error: "Not found this categories"})
            }
            return reply.status(200).send({Categories: Categories})
                } catch(error){
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
}