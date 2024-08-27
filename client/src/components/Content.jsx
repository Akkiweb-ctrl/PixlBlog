import React, { useEffect, useState } from "react";
import BlogList from "./BlogList";
import TopBlogList from "./TopBlogList";
import { useRecoilState } from "recoil";
import { blogsAtom } from "../store/atoms/blogsAtom";

const Content = () => {
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
  }, []);
  return (
    <div className="flex mt-4 gap-10 items-start">
      <div className="w-full h-screen overflow-y-scroll no-scrollbar">
      <h2 className="mb-4 font-medium text-greenOne text-xl border-b border-grayOne pb-2">Blogs</h2>

        <BlogList blogs={blogs}></BlogList>
      </div>
      {/* <TopBlogList></TopBlogList> */}
    </div>
  );
};

export default Content;
