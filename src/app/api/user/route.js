import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/helper/prismaclient";

export async function GET(request) {
  try {
    const result = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    //console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
