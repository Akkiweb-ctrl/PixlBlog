import React, { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import { useRecoilState } from "recoil";
import { myBlogsAtom } from "../store/atoms/myBlogsAtom";
import ClipLoader from "react-spinners/ClipLoader";
import NoMyBlogs from "../components/NoMyBlogs";

const YourBlogs = () => {
  const [myBlogs, setMyBlogs] = useRecoilState(myBlogsAtom);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    const getBlogs = async () => {
      const response = await fetch("http://localhost:3000/get-my-blogs", {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      setMyBlogs(await response.json());
      setFetching(false);
    };
    getBlogs();
  }, []);
  return (
    <>
       { myBlogs.length===0?<NoMyBlogs></NoMyBlogs>: <div className="w-3/4 h-screen overflow-y-scroll no-scrollbar m-auto ">
          <h2 className="font-medium text-greenOne text-xl mb-4  border-b border-grayOne pb-2 self-start">My Blogs</h2>
        
        <div className=" w-full ">
            {fetching ? <ClipLoader/>:<BlogList blogs={myBlogs}></BlogList>}
        </div>
        </div>}
    </>
  );
};
export default YourBlogs;
