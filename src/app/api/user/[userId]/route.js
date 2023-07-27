import { prisma } from "@/helper/prismaclient";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = params;
  console.log(userId);
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
