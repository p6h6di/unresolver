import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import React from "react";

const page = async () => {
  return (
    <div>
      <Editor />
      <div className="m-4 flex justify-end">
        <Button type="submit" className="w-full" form="unresolver-post-form">
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
