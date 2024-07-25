import { validateJWT } from "@/helpers/validate-jwt";
import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient()

export async function POST(req) {
    const user = validateJWT()
    const data = await req.json()
    const task = await prisma.task.create({ 
        data: {
            title: data.title,
            status: "do zrobienia",
            userId: user.id
        }
    })

    return Response.json(task)
}

export async function GET(req) {
    const user = validateJWT()
    const tasks = await prisma.task.findMany({
        where: {
            userId: user.id
        }
    })
    return Response.json(tasks)
}

export async function PUT(req) {
    const user = validateJWT()
    const taskId = parseInt (req.nextUrl.searchParams.get("update"))
    const data = await req.json()
    const task = await prisma.task.update({
        where: {
            userId: user.id,
            id: taskId
        },
        data: {
            title: data.title,
            status: data.status
        }
    })
    return Response.json(task)
} 

export async function DELETE(req) {
    const user = validateJWT()
    const taskId = parseInt (req.nextUrl.searchParams.get("delete")) 
    await prisma.task.delete({
        where: {
            userId: user.id,
            id: taskId
        }
    })
    return Response.json({data: "sukces"})
}