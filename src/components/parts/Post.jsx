import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiComment, BiLike, BiDislike } from "react-icons/bi";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { PiShareFat } from "react-icons/pi";

function Post() {
  return (
    <div className="border border-b-gray-400 bg-white flex flex-row gap-2">
      <div className="bg-slate-200 w-14 flex flex-col justify-start items-center text-xl py-2 gap-2">
        <ImArrowUp className="text-red-500 scale-75 hover:scale-100 hover:text-red-400 cursor-pointer" />
        <div className="text-sm">20</div>{" "}
        <ImArrowDown className="scale-75 hover:scale-100 hover:text-red-400 cursor-pointer" />
      </div>
      <div className="flex-1 p-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>Karthik</div>
            <div>10hrs ago</div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-xl">Lorem ipsum dolor sit amet</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
            </div>
          </div>
          <div className="flex flex-row gap-3 text-2xl">
            <BiComment className="scale-80 hover:scale-120 cursor-pointer" />
            <PiShareFat className="scale-80 hover:scale-120 cursor-pointer" />
          </div>
          <div>
            <div className="flex flex-row gap-2">
              <Avatar className="h-4 w-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>Karthik</div>
              <div>10hrs ago</div>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2">
              <Avatar className="h-4 w-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>Karthik</div>
              <div>10hrs ago</div>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor eiusmod tempor eiusmod tempor{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;