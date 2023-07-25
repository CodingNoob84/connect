import React from "react";
import Leftsidebar from "./Leftsidebar";
import Scrollablecontent from "./Scrollablecontent";
import Rightsidebar from "./Rightsidebar";

function Bodycontent({ userId }) {
  return (
    <div className="m-2 flex-1 justify-between text-sm">
      <div className="w-full m-auto flex flex-row">
        <div className="hidden md:block md:w-1/4 md:m-2">
          <Leftsidebar />
        </div>
        <div className="w-full md:w-2/4 md:m-2">
          <Scrollablecontent userId={userId} />
        </div>
        <div className="hidden md:block md:w-1/4 md:m-2">
          <Rightsidebar />
        </div>
      </div>
    </div>
  );
}

export default Bodycontent;
