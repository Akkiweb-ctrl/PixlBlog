import React, { useState } from "react";
import TopBlog from "./TopBlog";

const TopBlogList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // return (
  //   <div
  //     className={`flex h-screen bg-gray-100 ${isOpen ? "overflow-hidden" : ""} hidden sm:hidden xl:block`}
  //   >
  //     <div
  //       className={`w-64 bg-gray-800 text-white ${isOpen ? "block" : "hidden"}`}
  //     >
  //       {/* Sidebar content here */}
  //     </div>
  //     <div className="flex flex-col flex-1 overflow-hidden">
  //       <div className="flex justify-between bg-gray-200 p-4">
  //         {/* <button
  //           className="block  lg:hidden px-3 py-2 bg-white text-greenOne rounded-md"
  //           onClick={toggleSidebar}
  //         > */}
  //           {/* Icon or text for sidebar toggle button */}
  //           {isOpen ? 'Close' : 'Open'} 
  //           <button className="  px-3 py-2  rounded-lg shadow-2xl bg-white" onClick={toggleSidebar}>
  //             <h2 className="font-medium text-lg mb-2 px-4 pt-2">Top Blogs</h2>
  //             <TopBlog></TopBlog>
  //             <TopBlog></TopBlog>
  //             <TopBlog></TopBlog>
  //           </button>
  //         {/* </button> */}
  //       </div>
  //       <div className="overflow-y-auto p-4">{/* Main content here */}</div>
  //     </div>
  //   </div>
  // );
  return (
    <div className='w-full  rounded-lg shadow-2xl bg-white ' >
        <h2 className='font-medium text-lg mb-2 px-4 pt-2'>Top Blogs</h2>
        <TopBlog></TopBlog>
        <TopBlog></TopBlog>
        <TopBlog ></TopBlog>
    </div>
  )
};

export default TopBlogList;
