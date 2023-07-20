import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiComment, BiLike, BiDislike } from "react-icons/bi";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { PiShareFat } from "react-icons/pi";
import { Skeleton } from "@/components/ui/skeleton"


function SkeletonPost({content}) {
  return (
    <div className="border border-b-gray-400 bg-white flex flex-row gap-2">
      <div className="bg-slate-200 w-14 flex flex-col justify-start items-center text-xl py-2 gap-2">

      </div>
      <div className="flex-1 p-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Skeleton className="h-5 w-5"/>
            <Skeleton className="h-5 w-10"/>
            <Skeleton className="h-5 w-10"/>
          </div>
          <div className="flex flex-col gap-2">
            <div>
            <Skeleton className="w-1/2 h-4"/>
            </div>
            <div className="">
              <Skeleton className="w-full h-28"/>
            </div>
          </div>
          <div className="flex flex-row gap-3 text-2xl">
            <Skeleton className="w-10 h-4"/>
            <Skeleton className="w-10 h-4"/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonPost;
