"use client";

import { Button } from "../ui/button";
import { Icons } from "../Icons";

const SocialAccounts = () => {
  return (
    <>
      <Button variant="outline" className="w-full" onClick={() => {}}>
        <Icons.google className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Google</span>
      </Button>
      <Button variant="outline" className="w-full" onClick={() => {}}>
        <Icons.github className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Github</span>
      </Button>
    </>
  );
};

export default SocialAccounts;
