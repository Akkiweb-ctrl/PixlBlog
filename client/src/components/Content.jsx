import React, { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import BlogList from "./BlogList";
import TopBlogList from "./TopBlogList";
import { useRecoilState } from "recoil";
import { blogsAtom } from "../store/atoms/blogsAtom";
import { UserContext } from "../store/UserContext";
import { StoreContext } from "../store/StoreContext";

const Content = () => {
  const { user, updateUser, loggedIn } = useContext(UserContext);
  const {url} = useContext(StoreContext)

  const [fetching, setFetching] = useState(false);
  const [blogs, setBlogs] = useRecoilState(blogsAtom);
  useEffect(() => {
    const getBlogs = async () => {
      setFetching(true);
      const response = await fetch(url+"/get-blogs", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      if(response.ok){
        const data = await response.json()
        setBlogs(data);
        setFetching(false);
      }
      else{
        console.log(response)
        setFetching(false);
      }
     
    };
    const getProfile = async()=>{
      setFetching(true);
      const response = await fetch(url+"/profile", {
        headers: { "Content-type": "application/json" },
        credentials: "include"
      });
      if(response.ok){
        const data = await response.json();
        updateUser(data);
      setFetching(false);

      }
    }
    if(!loggedIn){
    getBlogs();
    }
    else{
      getProfile();
    getBlogs();

    }
  }, []);
  return (
    <>
      <div className={`flex gap-20 justify-between `}>
        <div className="pt-4 w-9/12 sm:w-9/12 lg:w-9/12 m-auto h-screen overflow-y-scroll no-scrollbar ">
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
