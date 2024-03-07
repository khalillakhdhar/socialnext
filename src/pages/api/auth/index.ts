import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Set CORS headers to allow requests from all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        const { email, mdp } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            if (user && bcrypt.compareSync(mdp, user.mdp)) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log(token);
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'max-age=180000');
                return res.status(200).json(token);
            } else {
                console.log('email or password incorrect');
                return res.status(400).json({ message: 'email or password incorrect' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    } else {
        // Send a response for other request methods (e.g., GET)
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
