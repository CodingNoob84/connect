"use client";
import { crudLikes } from "@/lib/dbservices";
import React, { useState } from "react";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Likesmodal from "./Likesmodal";

function getIsLikedForUserId(likes, userId) {
  const likeEntry = likes.find((like) => like.userId === userId);
  if (likeEntry) {
    return likeEntry.isLiked;
  }
  return "";
}

function totalIsLiked(likes) {
  let countIsLiked0 = 0;
  let countIsLiked1 = 0;

  likes.forEach((like) => {
    if (like.isLiked === "0") {
      countIsLiked0++;
    } else if (like.isLiked === "1") {
      countIsLiked1++;
    }
  });
  return countIsLiked1 - countIsLiked0;
}

function LikesectionH({ likes, userId, postId }) {
  const [likesArray, setLikesArray] = useState(likes);
  const [isLiked, setIsLiked] = useState(
    getIsLikedForUserId(likesArray, userId)
  );
  const handleLike = async (val) => {
    if (isLiked === val) {
      setIsLiked("");
    } else {
      setIsLiked(val);
    }
    const data = {
      isLiked: isLiked === val ? "" : val,
      postId: postId,
      userId: userId,
    };

    // Call the API to update the like
    try {
      const result = await crudLikes(data);
      setLikesArray(result?.result);
      //console.log(result?.result);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  //console.log(isLiked);
  return (
    <div className=" flex flex-row justify-center items-center gap-2">
      <ImArrowUp
        size={20}
        className={`${
          isLiked === "1" && "text-red-500"
        }  scale-75 hover:scale-100 hover:text-red-400 cursor-pointer`}
        onClick={() => handleLike("1")}
      />
      <Dialog>
        <DialogTrigger>
          <div className="text-sm cursor-pointer w-4 h-4 rounded-full flex justify-center items-center hover:bg-slate-300">
            <div className="text-center">{totalIsLiked(likesArray)}</div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Likesmodal postId={postId} />
          </DialogHeader>
        </DialogContent>
      </Dialog>{" "}
      <ImArrowDown
        size={20}
        className={`${
          isLiked === "0" && "text-red-500"
        }  scale-75 hover:scale-100 hover:text-red-400 cursor-pointer`}
        onClick={() => handleLike("0")}
      />
    </div>
  );
}

export default LikesectionH;
