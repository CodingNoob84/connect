import React from "react";
import Leftsidebar from "./Leftsidebar";
import Scrollablecontent from "./Scrollablecontent";
import Rightsidebar from "./Rightsidebar";

function HomePageBodyContent({ userId }) {
  return (
    <div className="m-2 flex-1 justify-between text-sm">
      <div className="w-full m-auto flex flex-row">
        <div className="hidden md:block md:w-1/4 md:m-2 md:flex-shrink-0 md:fixed md:left-0 h-full">
          <Leftsidebar />
        </div>
        <div className="w-full md:w-2/4 md:m-2 md:ml-[320px] md:mr-[320px] overflow-y-auto">
          <Scrollablecontent userId={userId} />
        </div>
        <div className="hidden md:block md:w-1/4 md:m-2 md:flex-shrink-0 md:fixed md:right-0 h-full">
          <Rightsidebar />
        </div>
      </div>
    </div>
  );
}

export default HomePageBodyContent;
