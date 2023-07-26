"use client";
import { getLikes } from "@/lib/dbservices";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "../ui/skeleton";
function splitLikesByIsLiked(likes) {
  const liked0 = [];
  const liked1 = [];

  likes.forEach((like) => {
    if (like.isLiked === "0") {
      liked0.push(like);
    } else if (like.isLiked === "1") {
      liked1.push(like);
    }
  });

  return [liked0, liked1];
}

function camelCaseToWords(str) {
  return str.toLowerCase();
}

function truncateString(str) {
  const camelStr = camelCaseToWords(str);
  if (camelStr.length <= 15) {
    return camelStr;
  } else {
    return camelStr.slice(0, 15) + "...";
  }
}

function Likesmodal({ postId }) {
  //console.log("likesmodal");
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["post", postId, "likes"],
    queryFn: () => getLikes(postId),
  });
  const [dislikeArray, likeArray] = splitLikesByIsLiked(data || []);

  //console.log(dislikeArray);
  return (
    <div className="w-full border p-2 flex flex-row m-2">
      <div className="w-1/2 flex flex-col">
        <div className="border-b border-b-gray-500">Likes</div>
        <div className="flex flex-col">
          {isLoading ? (
            <div className="w-full">
              <Skeleton className="w-full" />
            </div>
          ) : (
            likeArray.map((like, i) => (
              <div key={i} className="text-left text-sm p-0.5">
                {truncateString(like.user.name)}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="border-b border-b-gray-500">DisLikes</div>
        <div className="flex flex-col">
          {isLoading ? (
            <div className="w-full">
              <Skeleton className="w-full" />
            </div>
          ) : (
            dislikeArray.map((like, i) => (
              <div key={i} className="text-left text-sm p-0.5">
                {truncateString(like.user.name)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Likesmodal;
