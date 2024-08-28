import React from "react";
import { IoIosTimer } from "react-icons/io";

const TopBlog = () => {
  return (
    <div className=" border-b p-4 border-grayOne min-w-fit cursor-pointer">
      <div className="flex gap-2 mb-2">
        <span className="self-center text-greenOne">
          <IoIosTimer />
        </span>
        <span className="font-light">29 Feb 2024, Thursday</span>{" "}
      </div>
      <p>How are AgriTech Startups Revolutionising farming...</p>
      <p> By -<span className="font-medium text-greenOne"> Dr Anu Kadyan,</span></p>
    </div>
  );
};

export default TopBlog;
