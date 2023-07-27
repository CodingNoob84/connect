"use client";
import { getUsers } from "@/lib/dbservices";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

function Rightsidebar() {
  const { data, isFetched, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
  //console.log(data);
  return (
    <div className="flex flex-col border border-slate-400 bg-white rounded-md p-2">
      <div className="text-xl border-b">Users</div>
      <div className="flex flex-col gap-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div className="w-full h-5" key={i}>
                {" "}
                <Skeleton key={i} className="w-full h-5" />
              </div>
            ))
          : data.map((user) => (
              <Link href={`/user/${user.id}`} key={user.id}>
                <div key={user.id} className="hover:bg-slate-100 hover:text-md">
                  {user.name}
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default Rightsidebar;
