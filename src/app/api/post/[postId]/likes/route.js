import { prisma } from "@/helper/prismaclient";
import { NextResponse } from "next/server";

export async function GET(req,{ params }){
    const{ postId }=params;
    console.dir(postId)
    try {
      
const likes = await prisma.like.findMany({
  where: {
    postId: postId,
  },

  select: {
    id: true,
    isLiked: true,
    user: {
      select:{
        name:true,
        image:true,
      }
    },
  },
});
console.dir(likes)
     return NextResponse.json(likes)
   } catch (error) {
     return NextResponse.json({message:"error",error:error})
   }
   }