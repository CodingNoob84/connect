"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

function Navbar({ session }) {
  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-slate-200">
      <div className="m-2 h-[60px] border border-slate-400 rounded-sm flex justify-between bg-slate-100 p-2">
        <div className="text-2xl flex justify-center items-center">
          <Link href="/">
            <Image src="/connect-logo.png" alt="Logo" width={150} height={80} />
          </Link>
        </div>
        <div className="flex justify-center items-center mr-5">
          <DropdownMenu className="focus:outline-none">
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={`${
                    session?.user?.image != null
                      ? session?.user?.image
                      : "./UnknownPerson.jpg"
                  } `}
                />
                <AvatarFallback>
                  <AvatarImage src="/UnknownPerson.jpg" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-200">
              <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/user/${session?.user?.id}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href={`/user`}>Users</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
