"use client";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { BiLink } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  QueryCache,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { createPost, fetchPosts, getPosts } from "@/lib/dbservices";

function Createpost({ userId, setCpShow, refetch }) {
  const [loading, setLoading] = useState(false);

  const titleref = useRef();
  const descref = useRef();

  const createPostMutation = useMutation(createPost, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      //console.log("Post created successfully!");
      //console.log(data);
      setLoading(false);
      onCloseCP();
      refetch();
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      setLoading(false);
    },
  });

  const handleCreatePost = async () => {
    setLoading(true);
    const postData = {
      title: titleref.current.value,
      description: descref.current.value,
      authorId: userId,
    };
    createPostMutation.mutate(postData);
  };

  const onCloseCP = () => {
    titleref.current.value = "";
    descref.current.value = "";
    setCpShow(false);
  };
  return (
    <div className="border border-b-gray-400 bg-white p-4 flex flex-col gap-2">
      <Input ref={titleref} placeholder="Title..." />
      <Textarea ref={descref} placeholder="Description..." />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5 items-center">
          <div className="w-[24px] h-[24px] bg-slate-200 scale-90 hover:scale-110 flex justify-center rounded-full items-center">
            <BiLink />
          </div>
          <div className="w-[24px] h-[24px] bg-slate-200 scale-90 hover:scale-110 flex justify-center rounded-full items-center">
            <BsImageFill />
          </div>
        </div>
        <Button
          className="text-sm h-7"
          loading={loading}
          loadingtext={"Please wait"}
          onClick={() => handleCreatePost()}
        >
          Create new Post
        </Button>
      </div>
    </div>
  );
}

export default Createpost;
