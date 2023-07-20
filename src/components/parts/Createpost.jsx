"use client"
import React, { useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { BiLink } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import axios from "axios";

const data={
  "user": {
      "name": "Karthik Kumar",
      "email": "karthithelearner@gmail.com",
      "image": "https://lh3.googleusercontent.com/a/AAcHTtezN1mjrOk0CA_bvMcsUy5CLA3WvVNQmN3MYnlo9WOXzSQ=s96-c",
      "id": "clk84hncy0000jfyoljzhmmev"
  },
  "expires": "2023-08-19T09:30:20.617Z"
}

function Createpost() {
  const[cpShow, setCpShow]=useState(true);
  const[loading, setLoading]=useState(false);
  //const {data} = useSession();
  console.log("created")
  console.log(data)
  const titleref=useRef();
  const descref=useRef();

  const handleCreatePost=async ()=>{
    const postData={
      title:titleref.current.value,
      description:descref.current.value,
      authorId:data?.user?.id
    }
    const url =`api/post`;
    console.log(url)
    await axios.post(url, postData)
    .then(response => {
      const result=response.data;
      console.log(result)
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
    
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <Button className="text-sm h-7" onClick={()=>setCpShow(!cpShow)}>Create New Post</Button>
        <Button className="text-sm h-7" >Refresh</Button>
      </div>
     { cpShow &&  <div className="border border-b-gray-400 bg-white p-4 flex flex-col gap-2">
      <Input ref={titleref} placeholder="Title..." />
      <Textarea ref={descref} placeholder="Description..." />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5 items-center">
          <div className="w-[24px] h-[24px] bg-slate-200 scale-90 hover:scale-110 flex justify-center rounded-full items-center">
            <BiLink />
          </div>
          <div className="w-[24px] h-[24px] bg-slate-200 scale-90 hover:scale-110 flex justify-center rounded-full items-center">
            <BsImageFill />
          </div>
          <div>{JSON.stringify(data?.user?.id)}</div>
        </div>
        <Button className="text-sm h-7" onClick={()=>handleCreatePost()}>Create new Post</Button>
      </div>
    </div>
    }
    </div>
   
  );
}

export default Createpost;
