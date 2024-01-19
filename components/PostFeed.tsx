"use client";

import { ExtendedPost } from "@/types/prisma";
import React, { useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/app/page";
import PostWrapper from "./PostWrapper";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
}

const PostFeed = ({ initialPosts }: PostFeedProps) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["infinite-post-query"],
    queryFn: async ({ pageParam = 1 }) => {
      const query = `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}`;
      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    initialData: { pages: [initialPosts], pageParams: [1] },
  });

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;
  return (
    <ul className="col-span-2 mb-12 flex w-full flex-col gap-8">
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            // Add a ref to the last post in the list
            <li key={post.id} ref={ref}>
              <PostWrapper post={post} />
            </li>
          );
        } else {
          return <PostWrapper key={post.id} post={post} />;
        }
      })}
    </ul>
  );
};

export default PostFeed;
