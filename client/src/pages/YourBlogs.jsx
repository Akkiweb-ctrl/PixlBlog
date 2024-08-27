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
      <div className=" flex flex-col items-center ">
        <div className="w-2/4 mb-4 font-medium text-greenOne text-xl border-b border-grayOne pb-2 ">
          <h2 className="self-start">My Blogs</h2>
        </div>
        <div className=" w-2/4  ">
          {/* <div className=""> */}
            <BlogList blogs={myBlogs}></BlogList>
          {/* </div> */}
        </div>
      </div>
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
