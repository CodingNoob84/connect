"use client";
import React, { useEffect, useState } from "react";
import Createpost from "../parts/Createpost";
import Post from "../parts/Post";
import { Button } from "../ui/button";
import axios from "axios";
import { fetchPosts } from "@/lib/dbservices";
import SkeletonPost from "../parts/Skeletonpost";
import { useQuery } from "@tanstack/react-query";

const Posts = [
  {
    id: "clk9pjzx9000bjf38u9wx34z8",
    createdAt: "2023-07-19T12:36:51.741Z",
    updatedAt: "2023-07-19T12:36:51.741Z",
    title: "sixth title",
    description: "sixth description",
    authorId: "clk84hncy0000jfyoljzhmmev",
    author: {
      image:
        "https://lh3.googleusercontent.com/a/AAcHTtezN1mjrOk0CA_bvMcsUy5CLA3WvVNQmN3MYnlo9WOXzSQ=s96-c",
      name: "Karthik Kumar",
    },
  },
  {
    id: "clk9p7bmw0009jf38ink1ck06",
    createdAt: "2023-07-19T12:27:00.393Z",
    updatedAt: "2023-07-19T12:27:00.393Z",
    title: "fifth title",
    description: "fifth description",
    authorId: "clk84hncy0000jfyoljzhmmev",
    author: {
      image:
        "https://lh3.googleusercontent.com/a/AAcHTtezN1mjrOk0CA_bvMcsUy5CLA3WvVNQmN3MYnlo9WOXzSQ=s96-c",
      name: "Karthik Kumar",
    },
  },
  {
    id: "clk9msr4m0007jf38fg5zd48v",
    createdAt: "2023-07-19T11:19:41.398Z",
    updatedAt: "2023-07-19T11:19:41.398Z",
    title: "hello",
    description: "hello everyone",
    authorId: "clk84hncy0000jfyoljzhmmev",
    author: {
      image:
        "https://lh3.googleusercontent.com/a/AAcHTtezN1mjrOk0CA_bvMcsUy5CLA3WvVNQmN3MYnlo9WOXzSQ=s96-c",
      name: "Karthik Kumar",
    },
  },
  {
    id: "clk9mine0000bjffw0789pddf",
    createdAt: "2023-07-19T11:11:48.309Z",
    updatedAt: "2023-07-19T11:11:48.309Z",
    title: "third post title",
    description: "third post description",
    authorId: "clk84hncy0000jfyoljzhmmev",
    author: {
      image:
        "https://lh3.googleusercontent.com/a/AAcHTtezN1mjrOk0CA_bvMcsUy5CLA3WvVNQmN3MYnlo9WOXzSQ=s96-c",
      name: "Karthik Kumar",
    },
  },
  {
    id: "clk9j7msz0003jffwnmahssj8",
    createdAt: "2023-07-19T09:39:17.171Z",
    updatedAt: "2023-07-19T09:39:17.171Z",
    title: "second post title",
    description: "second post description",
    authorId: "clk84hncy0000jfyoljzhmmev",
    author: {
      image:
        "https://lh3.googleusercontent.com/a/AAcHTtezN1mjrOk0CA_bvMcsUy5CLA3WvVNQmN3MYnlo9WOXzSQ=s96-c",
      name: "Karthik Kumar",
    },
  },
  {
    id: "clk9j71ae0001jffwv3hj7rlx",
    createdAt: "2023-07-19T09:38:49.285Z",
    updatedAt: "2023-07-19T09:38:49.285Z",
    title: "first post title",
    description: "first post description",
    authorId: "clk84hncy0000jfyoljzhmmev",
    author: {
      image:
        "https://lh3.googleusercontent.com/a/AAcHTtezN1mjrOk0CA_bvMcsUy5CLA3WvVNQmN3MYnlo9WOXzSQ=s96-c",
      name: "Karthik Kumar",
    },
  },
];

export const getPosts = () => {
  const waitTenSeconds = new Promise((resolve) => {
    setTimeout(() => {
      resolve(Posts);
    }, 3000); // 10 seconds in milliseconds
  });

  return waitTenSeconds;
};

function Scrollablecontent() {
  const {
    data: posts,
    isLoading,
    isFetching,
    error,
  } = useQuery(["posts"], getPosts);
  //const [posts, setPosts] = useState([]);
  const [showComment, setShowComment] = useState("");

  // useEffect(() => {
  //   async function getPosts() {
  //     //const fetchedPosts = await fetchPosts();
  //     //console.log(fetchedPosts)
  //     //setPosts(fetchedPosts);
  //     setPosts(Posts)
  //   }
  //   getPosts();
  // }, []);

  async function handleNewPostCreated() {
    const fetchedPosts = await fetchPosts(baseurl);
    setPosts(fetchedPosts);
  }

  return (
    <div className="flex flex-col gap-2">
      <Createpost onPostCreated={handleNewPostCreated} />
      <div className="flex flex-col gap-4">
        {isFetching
          ? Array.from({ length: 5 }).map((i) => <SkeletonPost key={i} />)
          : posts?.map((post) => (
              <Post
                key={post.id}
                content={post}
                showComment={showComment}
                setShowComment={setShowComment}
              />
            ))}
      </div>
    </div>
  );
}

export default Scrollablecontent;
