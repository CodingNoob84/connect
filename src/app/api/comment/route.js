import { NextResponse } from "next/server";
import { prisma } from "@/helper/prismaclient";

export async function POST(req){
    const data= await req.json();
    console.dir(data)
    try {
        const result = await prisma.Comment.create({data})
        console.dir({msg:"success",result:result})
        return NextResponse.json({result})
    } catch (error) {
        return NextResponse.json({message:"error",error:error})
    }
}


