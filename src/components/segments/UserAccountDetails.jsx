import { getUser } from "@/lib/dbservices";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

function UserAccountDetails({ userId }) {
  const { data, isFetched, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });
  console.log(data);
  return (
    <div className="flex flex-row-reverse">
      {isLoading ? (
        <div className="border w-2/3 border-slate-400 bg-white rounded-md flex flex-col p-4">
          <div className="flex justify-center items-center h-32">
            <div className="w-16 h-16 rounded-full">
              <Skeleton />
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <Skeleton />
            </div>
            <div>
              <Skeleton />
            </div>
          </div>
        </div>
      ) : (
        <div className="border w-2/3 border-slate-400 bg-white rounded-md flex flex-col p-4">
          <div className="flex justify-center items-center h-32">
            <Avatar className="w-16 h-16">
              <AvatarImage src={data.image} />
              <AvatarFallback>
                <AvatarImage src="/UnknownPerson.jpg" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <div>{data.name}</div>
            <div>{data.email}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAccountDetails;
