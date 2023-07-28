"use client";

import Leftsidebar from "@/components/segments/Leftsidebar";
import Navbar from "@/components/segments/Navbar";
import Rightsidebar from "@/components/segments/Rightsidebar";
import ScrollableUsercontent from "@/components/segments/ScrollableUsercontent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import {
  UserAccountDetails,
  UserAccountDetailsMobile,
} from "./UserAccountDetails";

function UserPageBodyContent() {
  const { userId } = useParams();

  return (
    <>
      <div className="block md:hidden">
        <UserAccountDetailsMobile userId={userId} />
      </div>

      <div className="m-2 flex-1 justify-between text-sm">
        <div className="w-full m-auto flex flex-row">
          <div className="hidden md:block md:w-1/4 md:m-2">
            <UserAccountDetails userId={userId} />
          </div>
          <div className="w-full md:w-2/4 md:m-2">
            <ScrollableUsercontent authorId={userId} />
          </div>
          <div className="hidden md:block md:w-1/4 md:m-2">
            <Rightsidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPageBodyContent;
