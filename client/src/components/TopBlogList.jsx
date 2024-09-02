import React, { useState } from "react";
import TopBlog from "./TopBlog";

const TopBlogList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='w-full mt-16 rounded-lg shadow-2xl bg-white ' >
        <h2 className='font-medium text-lg mb-2 px-4 pt-2'>Top Blogs</h2>
        <TopBlog></TopBlog>
        <TopBlog></TopBlog>
        <TopBlog ></TopBlog>
    </div>
  )
};

export default TopBlogList;
