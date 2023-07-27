import { prisma } from "@/helper/prismaclient";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = params;
  const page = parseInt(request.nextUrl.searchParams.get("page"));
  const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 5;
  const skip = (page - 1) * limit;
  //console.dir(page);
  //console.dir(userId);
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
        comments: {
          select: {
            id: true, // Selecting the comment ID to include it in the response
          },
        },
        likes: {
          select: {
            userId: true,
            isLiked: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: parseInt(limit),
      skip: parseInt(skip),
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}
