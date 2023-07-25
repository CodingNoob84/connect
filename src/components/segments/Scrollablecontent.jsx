"use client";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Createpost from "../parts/Createpost";
import Post from "../parts/Post";
import { Button } from "../ui/button";
import axios from "axios";
import { fetchPosts, getComments, getPosts } from "@/lib/dbservices";
import SkeletonPost from "../parts/Skeletonpost";
import { useInView } from "react-intersection-observer";

function Scrollablecontent({ userId }) {
  const { ref, inView } = useInView();

  const {
    data,
    isSuccess,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length === 5 ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  // const [showComment, setShowComment] = useState("");

  // const handleComment=(id)=>{
  //   if(showComment===id){
  //     setShowComment("")
  //   }else{
  //     setShowComment(id)
  //   }
  // }
  //console.log("comment_postid",showComment)

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <div className="flex flex-col gap-2">
      <Createpost userId={userId} />
      <div className="flex flex-col gap-4">
        {status === "loading" &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonPost key={i} />)}
        {isSuccess &&
          data.pages.map((page) =>
            page.map((post, i) => (
              <Post
                key={post.id} // Ensure the key prop is set to a unique value
                content={post}
                userId={userId}
              />
            ))
          )}
        {isFetchingNextPage &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonPost key={i} />)}
      </div>
      {/* Render a "Load More" button when there is more data to fetch */}
      {hasNextPage && (
        <Button onClick={handleLoadMore} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
}

export default Scrollablecontent;
