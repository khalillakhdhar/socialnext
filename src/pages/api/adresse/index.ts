import type  { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma=new PrismaClient(); //appel de prisma client pour la connexion a la base de donnée et l'execution des requetes

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'POST') {
    const { pays, ville, codeposte, rue,numero,userId } = req.body;
   const user=await prisma.user.findUnique({
where:{id:userId}   
})
if(!user){
    return res.status(400).json({message:"user not found"})
}
const nvadresse=await prisma.adresse.create({
    data:{
        pays,
        ville,
        codeposte,
        rue,
        numero,
        user:{
            connect:{
                id:userId
            }
        }
    }
})


}
}