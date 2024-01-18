import type  { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma=new PrismaClient(); //appel de prisma client pour la connexion a la base de donnée et l'execution des requetes
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if(req.method==='POST'){
    const {email,mdp}=req.body;
    try{
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(user && bcrypt.compareSync(mdp,user.mdp)){
            const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1h"})
            return res.status(200).json({token})
        }
        else{
            return res.status(400).json({message:"email or password incorrect"})
        }

    }
    catch(error){
        return res.status(500).json({message:"Something went wrong"})
    }
}

}
