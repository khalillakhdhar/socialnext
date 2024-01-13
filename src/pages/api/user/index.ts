import type  { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma=new PrismaClient(); //appel de prisma client pour la connexion a la base de donnée et l'execution des requetes

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'POST') {
    const { nom,prenom, email, mdp,age } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(mdp, salt);
    try {
        const user = await prisma.user.create({
            data: {
                nom,
                prenom,
                email,
                mdp: hash,
                age
            }
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }

}
if (req.method === 'GET') {
    try {
        const users = await prisma.user.findMany(
            {
                include:{
                    publications:true,
                    adresses:true
                }
            }
        );
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
}
}
