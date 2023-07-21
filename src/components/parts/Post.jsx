import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiComment, BiLike, BiDislike } from "react-icons/bi";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { PiShareFat } from "react-icons/pi";
import { getTimeAgo } from "@/helper/timehelper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Post({ content, showComment, setShowComment }) {
  return (
    <div className="border border-b-gray-400 bg-white flex flex-row">
      <div className="bg-slate-200 w-14 flex flex-col justify-start items-center text-xl py-2 gap-2">
        <ImArrowUp className="text-red-500 scale-75 hover:scale-100 hover:text-red-400 cursor-pointer" />
        <div className="text-sm">20</div>{" "}
        <ImArrowDown className="scale-75 hover:scale-100 hover:text-red-400 cursor-pointer" />
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <div className="p-2">
            {/* Avatar and name */}
            <div className="flex flex-row gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={content.author.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-md">{content.author.name}</div>
              <div className="text-xs">{getTimeAgo(content.updatedAt)}</div>
            </div>

            {/* Title and Description */}
            <div className="flex flex-col">
              <div className="font-bold text-xl">{content.title}</div>
              <div>{content.description}</div>
            </div>
          </div>

          {/* Comment and Share */}
          <div>
            <div className="flex flex-row gap-3 text-2xl p-2">
              <BiComment
                className="scale-80 hover:scale-120 cursor-pointer"
                onClick={() => setShowComment(content.id)}
              />
              <PiShareFat className="scale-80 hover:scale-120 cursor-pointer" />
            </div>

            {showComment === content.id && (
              <div>
                <div className="p-2 pl-4">
                  <div>
                    <div className="flex flex-row gap-2">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>Karthik</div>
                      <div>10hrs ago</div>
                    </div>
                    <div className="pl-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor{" "}
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
                    <div className="pl-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor eiusmod tempor eiusmod tempor{" "}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-200 flex flex-row gap-4 p-2">
                  <Input />
                  <Button>send</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
