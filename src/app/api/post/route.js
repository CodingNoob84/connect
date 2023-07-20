import { NextResponse } from "next/server";
import { prisma } from "@/helper/prismaclient";

export async function POST(req){
    const data= await req.json();
    console.dir(data)
    try {
        const result = await prisma.Post.create({data})
        console.dir(result)
        return NextResponse.json({result})
    } catch (error) {
        return NextResponse.json({message:"error",error:error})
    }
}

export async function GET(){
    try {
        const result = await prisma.post.findMany({
            include: {
              author: {
                select: {
                  image: true,
                  name: true,
                },
              },
            },
            orderBy: {
                updatedAt: 'desc', // 'desc' for descending order, 'asc' for ascending order
              },
          });
        return NextResponse.json({result})
    } catch (error) {
        return NextResponse.json({message:"error",error:error})
    }
}