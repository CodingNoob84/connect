import React from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { BiLink } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";

function Createpost() {
  return (
    <div className="border border-b-gray-400 bg-white p-4 flex flex-col gap-2">
      <Input placeholder="Title..." />
      <Textarea placeholder="Description..." />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5 items-center">
          <div className="w-[24px] h-[24px] bg-slate-200 scale-90 hover:scale-110 flex justify-center rounded-full items-center">
            <BiLink />
          </div>
          <div className="w-[24px] h-[24px] bg-slate-200 scale-90 hover:scale-110 flex justify-center rounded-full items-center">
            <BsImageFill />
          </div>
        </div>
        <Button className="text-sm h-7">Create new Post</Button>
      </div>
    </div>
  );
}

export default Createpost;
