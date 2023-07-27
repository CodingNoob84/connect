import { prisma } from "@/helper/prismaclient";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { postId } = params;
  console.dir(postId);
  try {
    const posts = await prisma.post.findMany({
      where: {
        postId: postId,
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
