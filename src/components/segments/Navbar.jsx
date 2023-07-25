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

function Navbar({ session }) {
  return (
    <div className="m-2 border border-slate-400 rounded-sm flex justify-between p-2">
      <div className="text-2xl flex justify-center items-center">Connect</div>
      <div>
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Navbar;
