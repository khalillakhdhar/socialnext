import type  { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if(req.method==='POST'){
    const {titre,sujet}=req.body;
    const groupe=await prisma.groupe.create({
        data:{
            titre,
            sujet
        }
    })
    return res.status(200).json(groupe)
}
if(req.method==='GET'){
    const groupe=await prisma.groupe.findMany({
        include:{
            membres:true
        }
    })
    return res.status(200).json(groupe)
}
if(req.method==='PUT'){
    const {id}=req.query;
    const {userid}=req.body;
   /* const membre=await prisma.user.findUnique({
        where:{
            id:Number(userid)
        }
    })
    if(!membre){
        return res.status(400).json({message:"user not found"})
    }
    */
    const groupe=await prisma.groupe.update({
        where:{
            id:Number(id)
        },
        data:{
            membres:{
                connect:{
                    id:Number(userid)
                }
            }
        }
    })
    return res.status(200).json(groupe)


}


}