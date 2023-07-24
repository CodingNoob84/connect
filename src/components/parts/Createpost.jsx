"use client";
import React, { useRef, useState } from "react";
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

// const data = {
//   user: {
//     name: "Karthik Kumar",
//     email: "karthithelearner@gmail.com",
//     image:
//       "https://lh3.googleusercontent.com/a/AAcHTtezN1mjrOk0CA_bvMcsUy5CLA3WvVNQmN3MYnlo9WOXzSQ=s96-c",
//     id: "clk84hncy0000jfyoljzhmmev",
//   },
//   expires: "2023-08-19T09:30:20.617Z",
// };

function Createpost() {
  const { refetch } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(1),
  });
  //const { refetch } = useQuery(["posts"], fetchPosts);
  const [cpShow, setCpShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  console.log("created");
  console.log(data);
  const titleref = useRef();
  const descref = useRef();

  const createPostMutation = useMutation(createPost, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      console.log("Post created successfully!");
      console.log(data);
      setLoading(false);
      onCloseCP();
      refetch();
      // const newPost = data; // Replace this with the actual data received from the mutation
      // QueryCache.setQueryData("posts", (oldData) => ({
      //   ...oldData,
      //   pages: [
      //     // Add the new post as the first data in the first page
      //     [newPost, ...oldData.pages[0]],
      //     ...oldData.pages.slice(1), // Append the rest of the pages
      //   ],
      // }));
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
      authorId: data?.user?.id,
    };
    createPostMutation.mutate(postData);
  };

  const onCloseCP = () => {
    titleref.current.value = "";
    descref.current.value = "";
    setCpShow(false);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <Button className="text-sm h-7" onClick={() => setCpShow(!cpShow)}>
          Create New Post
        </Button>
        <Button className="text-sm h-7" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>
      {cpShow && (
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
      )}
    </div>
  );
}

export default Createpost;
