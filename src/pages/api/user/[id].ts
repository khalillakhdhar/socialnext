import type  { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma=new PrismaClient(); //appel de prisma client pour la connexion a la base de donnée et l'execution des requetes
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { id } = req.query;
if (req.method === 'GET') {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }

}
if (req.method === 'PUT') {
    const { nom,prenom, email, age } = req.body;
    
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                nom,
                prenom,
                email,
                age
            }
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
}
if (req.method === 'DELETE') {
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
}
}