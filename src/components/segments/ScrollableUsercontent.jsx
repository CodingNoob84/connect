"use client";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Createpost from "../parts/Createpost";
import Post from "../parts/Post";
import { Button } from "../ui/button";
import axios from "axios";
import {
  fetchPosts,
  getComments,
  getPosts,
  getUserPosts,
} from "@/lib/dbservices";
import SkeletonPost from "../parts/Skeletonpost";
import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";

function ScrollableUsercontent({ authorId }) {
  const [cpShow, setCpShow] = useState(false);
  const { ref, inView } = useInView();
  const session = useSession();
  //console.log(session);
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
    queryKey: ["posts", authorId],
    queryFn: ({ pageParam = 1 }) => getUserPosts(pageParam, authorId),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length === 5 ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  const handleLoadMore = () => {
    fetchNextPage();
  };
  const { refetch } = useInfiniteQuery({
    queryKey: ["posts", authorId],
    queryFn: () => getUserPosts(1, authorId),
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div>
            {session.status != "loading" &&
              session.data.user.id === authorId && (
                <Button
                  className="text-sm h-7"
                  onClick={() => setCpShow(!cpShow)}
                >
                  Create New Post
                </Button>
              )}
          </div>

          <Button className="text-sm h-7" onClick={() => refetch()}>
            Refresh
          </Button>
        </div>
        {cpShow && (
          <Createpost
            userId={authorId}
            setCpShow={setCpShow}
            refetch={refetch}
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {status === "loading" &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonPost key={i} />)}
        {isSuccess &&
          data.pages.map((page) =>
            page.map((post, i) => (
              <Post
                key={post.id} // Ensure the key prop is set to a unique value
                content={post}
                userId={authorId}
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

export default ScrollableUsercontent;
