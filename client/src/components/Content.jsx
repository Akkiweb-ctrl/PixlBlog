import React, { useContext, useEffect, useState } from "react";
import BlogList from "./BlogList";
import TopBlogList from "./TopBlogList";
import { useRecoilState } from "recoil";
import { blogsAtom } from "../store/atoms/blogsAtom";
import { UserContext } from "../store/UserContext";

const Content = () => {
  const {user,setUser} =  useContext(UserContext)
  const [blogs, setBlogs] = useRecoilState(blogsAtom);
  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch("http://localhost:3000/get-blogs", {
        method: "GET",
        headers: { "Content-type": "application/json" },
        // credentials :'include'
      });
      setBlogs(await response.json());
    };
    getBlogs();
    // console.log(blogs)
  }, []);
  return (
    <div className="flex mt-4 gap-20 justify-between">
      <div className="sm:w-full md:w-9/12 md:m-auto h-screen overflow-y-scroll no-scrollbar">
        <h2 className="mb-4 font-medium text-greenOne text-xl border-b border-grayOne pb-2">
          Blogs
        </h2>

        <BlogList blogs={blogs}></BlogList>
      </div>
      {user._id && <div className="sm:hidden hidden md:block min-w-60">
      <TopBlogList></TopBlogList>

      </div>}
    </div>
  );
};

export default Content;
