import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiComment, BiLike, BiDislike } from "react-icons/bi";

import { PiShareFat } from "react-icons/pi";
import { getTimeAgo } from "@/helper/timehelper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Commentsection from "./Commentsection";
import Likesection from "./Likesection";

function Post({ content, userId }) {
  return (
    <div className="border border-b-gray-400 bg-white flex flex-row">
      <Likesection postId={content.id} userId={userId} likes={content.likes} />
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
          <Commentsection
            // showComment={showComment} handleComment={handleComment}
            commentscount={content.comments.length}
            postId={content.id}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
