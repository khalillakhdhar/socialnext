import type  { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma=new PrismaClient(); //appel de prisma client pour la connexion a la base de donnée et l'execution des requetes
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'POST') {
    const { text,publieurId } = req.body;
   const user=await prisma.user.findUnique({
where:{id:publieurId}   
})
if(!user){
    return res.status(400).json({message:"user not found"})
}
const nvpublication=await prisma.publication.create({
    data:{
        text,
        publieur:{
            connect:{
                id:publieurId
            }
        }
    }
})
}
if(req.method === 'GET'){
    const publication = await prisma.publication.findMany({
        include: {
            publieur: true,
            commentaires: {
                include: {
                    publieur: true  
                }
            }        
        }
    });
    return res.status(200).json(publication);
}
// supprimer une publication
if(req.method==='DELETE'){
    const {id}=req.query;
    const publication=await prisma.publication.delete({
        where:{
            id:Number(id)
        }
    })
    return res.status(200).json(publication)
}

}