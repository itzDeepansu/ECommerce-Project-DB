import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request) {
    const data = await request.json()
    const { name , email , password} = data
    const exist = await prisma.user.findUnique({
        where: {
          email,
        },
      });
    if(exist){
        return new NextResponse ("Email already exists",{status : 400})
    }
    if( !name  || !email || !password){
        return new NextResponse ("Empty fields",{status : 400})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await prisma.user.create({
        data : {
            name,
            email,
            hashedPassword
        }
    })
    return NextResponse.json(user)
}