import React from "react";
import Createpost from "../parts/Createpost";
import Post from "../parts/Post";
import { Button } from "../ui/button";

function Scrollablecontent() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <Button>Create New Post</Button>
        <Button>Refresh</Button>
      </div>
      {/* <Createpost /> */}
      <div className="flex flex-col gap-4">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Scrollablecontent;
