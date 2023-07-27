import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/helper/prismaclient";

export async function POST(req) {
  const data = await req.json();
  console.dir(data);
  try {
    const result = await prisma.Post.create({ data });
    console.dir({ msg: "success", result: result });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}

export async function GET(request) {
  const page = parseInt(request.nextUrl.searchParams.get("page"));
  //console.log("page",page);
  const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 5;
  //console.log("limit",limit);
  const skip = (page - 1) * limit;
  //console.log("skip",skip)
  try {
    //console.log("try")
    // const result = await prisma.post.findMany({
    //     include: {
    //       author: {
    //         select: {
    //           image: true,
    //           name: true,
    //         },
    //       },
    //       comments: {
    //         select: {
    //           id: true, // Selecting the comment ID to include it in the response
    //         },
    //       },

    //     },
    //     orderBy: {
    //         updatedAt: 'desc', // 'desc' for descending order, 'asc' for ascending order
    //       },
    //       skip: skip,
    //       take: limit,
    //   });
    const result = await prisma.post.findMany({
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
        updatedAt: "desc", // 'desc' for descending order, 'asc' for ascending order
      },
      take: parseInt(limit),
      skip: parseInt(skip),
    });
    console.log(result);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: "error", error: error });
  }
}

// export async function GET(request) {
//   const page=request.nextUrl.searchParams.get("page");
//   console.log("page",page);
//   const limit=request.nextUrl.searchParams.get("limit");
//   console.log("limit",limit);
//   return new NextResponse("Hello, Next.js!");
// }
