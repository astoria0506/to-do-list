import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient()

export async function POST(req) {
    const data = await req.json()
    await prisma.user.create({
        data: {
            email: data.email,
            password: data.password
        }
    })
    return Response.json({
        text: "git"
    }) 
} 