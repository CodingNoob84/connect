import React from "react";
import Login from "@/components/segments/Login";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


async function LoginPage() {
  const session = await getServerSession(AuthOptions)
  if(session){
    redirect("/")
  }
  return <div className="max-w-screen min-h-screen bg-slate-100 p-2">
   <Login/>
       </div>;
}

export default LoginPage;
