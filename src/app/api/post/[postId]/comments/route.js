import { prisma } from "@/helper/prismaclient";
import { NextResponse } from "next/server";

export async function GET(req,{ params }){
    const{postId}=params;
    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId: postId,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
     return NextResponse.json(comments)
   } catch (error) {
     return NextResponse.json({message:"error",error:error})
   }
   }