import type  { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if(req.method==='POST'){
    const { publieurId, publicationId, text } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(publieurId)
        }
    });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const publication = await prisma.publication.findUnique({
        where: {
            id: Number(publicationId)
        }
    });
    if (!publication) {
        return res.status(400).json({ message: 'Publication not found' });
    }
    try {
        const comment = await prisma.commentaire.create({
            data: {
                publicationId,
                publieurId,
                text
            }
        });
        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
}
if(req.method==='GET'){
    const commentaires=await prisma.commentaire.findMany({
        include:{
            publieur:true
        }
    })
    return res.status(200).json(commentaires)
}

}