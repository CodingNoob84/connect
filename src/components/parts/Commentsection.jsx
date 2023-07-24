"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { BiComment } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createComment, getComments } from "@/lib/dbservices"; // Import getComments function
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { getTimeAgo } from "@/helper/timehelper";
import { useSession } from "next-auth/react";

function Commentsection({ commentscount, postId, authorId }) {
  const datasession = useSession();
  console.log(datasession);
  console.log(datasession.data.user.id);
  const commentref = useRef("");
  const [showComment, setShowComment] = useState("");
  const [btnloading, setBtnloading] = useState(false);
  const [commentCount, setCommentCount] = useState(commentscount);

  const handleComment = (id) => {
    if (showComment === id) {
      setShowComment("");
    } else {
      setShowComment(id);
    }
  };

  // Create the mutation using the useMutation hook
  const createCommentMutation = useMutation(createComment, {
    onMutate: () => {
      setBtnloading(true);
    },
    onSuccess: () => {
      // Refetch the comments after a new comment is created
      getCommentsQuery.refetch();
    },
    onSettled: () => {
      setBtnloading(false);
    },
  });

  const handleCreateComment = async () => {
    const data = {
      content: commentref?.current?.value,
      postId: postId,
      authorId: datasession?.data?.user?.id,
    };
    try {
      // Call the createComment mutation function
      await createCommentMutation.mutateAsync(data);
      commentref.current.value = ""; // Clear the input after successful comment creation
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // Query to fetch comments using useQuery hook
  const getCommentsQuery = useQuery(
    ["postcomments", showComment],
    () => getComments(showComment),
    {
      enabled: showComment !== "",
    }
  );

  const { data: comments, isLoading: iscommentsLoading } = getCommentsQuery;

  useEffect(() => {
    if (!iscommentsLoading && comments) {
      setCommentCount(comments.length);
    }
  }, [comments, iscommentsLoading]);

  return (
    <div>
      <div className="flex flex-row gap-3 text-sm p-2">
        <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
          <BiComment
            className="scale-80 hover:scale-120 "
            onClick={() => handleComment(postId)}
          />
          <div>{commentCount} comments</div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
          <PiShareFat className="scale-80 hover:scale-120 " />
          <div>Share</div>
        </div>
      </div>

      {showComment === postId && (
        <div>
          <div className="p-2 pl-4">
            {iscommentsLoading ? (
              <div>
                <div className="flex flex-row gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-10" />
                  <Skeleton className="h-5 w-10" />
                </div>
                <div className="pl-6 w-full">
                  {" "}
                  <Skeleton />
                </div>
              </div>
            ) : (
              comments?.map((comment) => (
                <div key={comment.id}>
                  <div className="flex flex-row gap-2">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src={comment.author.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>{comment.author.name}</div>
                    <div className="text-xs">
                      {getTimeAgo(comment.updatedAt)}
                    </div>
                  </div>
                  <div className="pl-6">{comment.content}</div>
                </div>
              ))
            )}
          </div>
          <div className="bg-slate-200 flex flex-row gap-4 p-2">
            <Input ref={commentref} placeholder="comment...." />
            <Button
              onClick={() => handleCreateComment()}
              loading={btnloading}
              className="h-8"
            >
              send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Commentsection;
