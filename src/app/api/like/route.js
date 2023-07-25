import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/helper/prismaclient";

export async function POST(req){
    const data= await req.json();
    console.dir(data)
    try {
        let msg="";
        let result;
        const existingData = await prisma.Like.findFirst({
            where: {
              userId: data?.userId, // Replace YOUR_USER_ID with the actual user ID
              postId: data?.postId, // Replace YOUR_POST_ID with the actual post ID
            },
          });

          if(existingData){
            if(data.isLiked ===""){
                result= await prisma.like.delete({
                    where: {
                        id: existingData.id, 
                      }
                });
                msg="Sucessfully deleted";
            }else{
                result = await prisma.like.update({
                    where: {
                      id: existingData.id, 
                    },
                    data: {
                      isLiked: data.isLiked, 
                    },
                  });
                  msg="Sucessfully Updated";
               
            }
          }else{
            result = await prisma.Like.create({data});
            msg="Sucessfully created"
          }
          const likesarray= await prisma.like.findMany({
            where:{
                postId:data?.postId,
            },
            select:{
                userId:true,
                isLiked:true
            }
          })
        //console.dir({msg:msg,result:result})
        return NextResponse.json({msg:msg,result:likesarray})
    } catch (error) {
        return NextResponse.json({message:"error",error:error})
    }
}