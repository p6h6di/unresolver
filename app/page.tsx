import PostFeed from "@/components/PostFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/client";

export default async function Home() {
  const session = await auth();
  const initialPosts = await prisma.user.findFirst({
    where: { id: session?.user.id },
    include: {
      Post: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });
  return (
    <div className="mx-auto mt-8 w-4/5 md:my-12 md:w-1/2">
      <PostFeed initialPosts={initialPosts?.Post!} />
    </div>
  );
}
