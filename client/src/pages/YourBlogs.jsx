import React, { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import { useRecoilState } from "recoil";
import { myBlogsAtom } from "../store/atoms/myBlogsAtom";

const YourBlogs = () => {
  const [myBlogs, setMyBlogs] = useRecoilState(myBlogsAtom);
  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch("http://localhost:3000/get-my-blogs", {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      setMyBlogs(await response.json());
    };
    getBlogs();
  }, []);
  return (
    <>
      {/* <div className=" flex mt-4 gap-20 items-start "> */}
        <div className="w-3/4 h-screen overflow-y-scroll no-scrollbar m-auto ">
          <h2 className="font-medium text-greenOne text-xl mb-4  border-b border-grayOne pb-2 self-start">My Blogs</h2>
        
        <div className=" w-full ">
          {/* <div className=""> */}
            <BlogList blogs={myBlogs}></BlogList>
          {/* </div> */}
        </div>
        </div>
      {/* </div> */}
    </>
  );
};

// export const  blogLoader = async()=>{
//   const response = await fetch('http://localhost:3000/get-my-blogs',{
//     method:'GET',
//     headers : {'Content-type':'application/json'},
//     credentials :'include'
// })
// setMyBlogs(await response.json());
// }
export default YourBlogs;
