import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="mx-auto w-[800px] space-y-6">
      <Skeleton className="h-[50px] w-full" />
      <Skeleton className="h-[20px] w-2/3" />
      <Skeleton className="h-[20px] w-full" />
      <Skeleton className="h-[20px] w-full" />
    </div>
  );
};

export default Loading;
