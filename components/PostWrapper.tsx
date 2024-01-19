import { formatTimeToNow } from "@/lib/utils";
import { Post, User } from "@prisma/client";
import React, { useRef } from "react";
import EditorOutput from "./EditorOutput";

interface PostProps {
  post: Post & {
    author: User;
  };
}

const PostWrapper = ({ post }: PostProps) => {
  // tracking the content height
  const pRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex max-h-[420px] flex-col justify-between rounded-lg bg-zinc-100 p-8 shadow">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          Posted by u/{post.author.username}
        </p>

        <span className="text-xs font-medium">
          {formatTimeToNow(new Date(post.createdAt))}
        </span>
      </div>

      <a
        href={`/post/${post.id}`}
        className="underline-offset-1 hover:underline"
      >
        <h1 className="py-2 text-2xl font-semibold leading-7">{post.title}</h1>
      </a>

      <div
        className="relative max-h-40 w-full overflow-y-clip text-sm"
        ref={pRef}
      >
        <EditorOutput content={post.content} />
        {/* blur bottom if content is too long */}
        {pRef.current?.clientHeight === 160 ? (
          <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-r from-zinc-100 to-transparent "></div>
        ) : null}
      </div>
    </div>
  );
};

export default PostWrapper;
