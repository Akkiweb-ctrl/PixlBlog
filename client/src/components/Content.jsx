import React, { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import BlogList from "./BlogList";
import TopBlogList from "./TopBlogList";
import { useRecoilState } from "recoil";
import { blogsAtom } from "../store/atoms/blogsAtom";
import { UserContext } from "../store/UserContext";

const Content = () => {
  const { user, setUser } = useContext(UserContext);
  const [fetching, setFetching] = useState(false);
  const [blogs, setBlogs] = useRecoilState(blogsAtom);
  useEffect(() => {
    const getBlogs = async () => {
      setFetching(true);
      const response = await fetch("http://localhost:3000/get-blogs", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      setBlogs(await response.json());
      setFetching(false);
    };
    getBlogs();
  }, []);
  return (
    <>
      <div className={`flex gap-20 justify-between `}>
        <div className="pt-4 sm:w-full md:w-9/12 md:m-auto h-screen overflow-y-scroll no-scrollbar ">
          <h2 className="mb-4 font-medium text-greenOne text-xl border-b border-grayOne pb-2">
            Blogs
          </h2>

          {fetching ? <ClipLoader /> : <BlogList blogs={blogs}></BlogList>}
        </div>
        {user._id && (
          <div className="sm:hidden hidden md:block min-w-60">
            <TopBlogList></TopBlogList>
          </div>
        )}
      </div>
    </>
  );
};

export default Content;
