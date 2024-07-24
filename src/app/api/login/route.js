import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
      password: data.password
    }
  });

  const jwtSecret = process.env.AUTH_PRIVATE_KEY
    ? process.env.AUTH_PRIVATE_KEY
    : "shhhhh";
  const jwtToken = jwt.sign({ id: user.id }, jwtSecret);

  return Response.json({
    token: jwtToken
  }) 
}
