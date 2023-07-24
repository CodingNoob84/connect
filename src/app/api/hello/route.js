import { NextRequest } from "next/server";

export async function GET(request) {
  console.log(request.nextUrl.searchParams.get("foo"));
  return new Response("Hello, Next.js!");
}