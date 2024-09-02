import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

import { UserContext } from "../store/UserContext";
import TopBlogList from "./TopBlogList";
import { StoreContext } from "../store/StoreContext";

const Header = () => {
  const { user, updateUser,setLoggedIn } = useContext(UserContext);
  const [displayMenu, setDisplayMenu] = useState(false);
  // const [activeTab, setActiveTab] = useState("");
  const [displayTopBlogList, setDisplayTopBlogList] = useState(false);
  const {url} = useContext(StoreContext)


  const toggleMenu = () => {
    setDisplayMenu(!displayMenu);
  };
  const toggleAndLogout = () => {
    logout();
    toggleMenu();
  };
  const toggleTopBlogsAndMenu = () => {
    setDisplayTopBlogList(!displayTopBlogList);
  };
  // useEffect(() => {
  //   fetch(url+"profile", {
  //     credentials: "include",
  //   }).then((response) => {
  //     response.json().then((data) => {
  //       updateUser(data);
  //       // console.log(data);
        
  //     });
  //   });
  // }, []);
  const logout = () => {
    fetch(url+"/logout", {
      credentials: "include",
      method: "POST",
    }).then((response) => {
      response.json().then((data) => {
        updateUser(data);
        setLoggedIn(false)
      });
    });
  };
  return (
    <div className="w-full sticky top-0 bg-white min-w-fit">
      <div className="p-4 flex justify-between border-b border-headerGray">
        <Link to="/" className="font-extrabold text-4xl text-greenOne">
          PixlBlog
        </Link>
        {user._id ? (
          <div className="flex gap-4">
            <div className=" gap-4  hidden sm:hidden md:flex">
           
              <Link
                to="/create-blog"
                className={`createBlogTab cursor-pointer text-greenOne font-medium self-center px-4 `}
                // onClick={()=>{setActiveTab("CreateBlog")}}
                // ${activeTab==="CreateBlog" ? "bg-app-bg rounded-lg":""}
              >
                Create Blog
              </Link>
              <Link
                to="/my-blogs"
                className={`cursor-pointer text-greenOne font-medium px-4 self-center`}
                // onClick={()=>{setActiveTab("MyBlogs")}}
              >
                My Blogs
              </Link>
              <Link
                to="/"
                className="cursor-pointer text-red font-medium self-center px-4 pt"
                onClick={() => logout()}
              >
                Logout
              </Link>
            </div>
            <div className="self-center relative">
              <Link
                className="cursor-pointer text-greenOne text-3xl font-medium self-center group flex "
                onClick={toggleMenu}
              >
                <CgProfile />
              </Link>
              <div
                className={`absolute right-6 w-48 bg-white  border-grayOne border-2 rounded-lg ${
                  displayMenu ? "" : "hidden"
                }`}
              >
                <p className="w-full px-2 py-1 border-b border-grayOne md:border-none">
                  {user.name}
                </p>
                <div className="relative">
                  <Link
                    className="cursor-pointer text-greenOne font-medium self-center md:hidden block sm:block border-b border-grayOne px-2 py-1"
                    onClick={toggleTopBlogsAndMenu}
                  >
                    Top Blogs
                  </Link>
                  <div className={`absolute right-48 top-0 w-60  md:hidden sm:block ${
                  displayTopBlogList ? "" : "sm:hidden hidden"
                }`}>
                  <TopBlogList></TopBlogList>
                  </div>
                </div>
                <Link
                  to="/create-blog"
                  className="cursor-pointer text-greenOne font-medium self-center md:hidden block sm:block border-b border-grayOne px-2 py-1"
                  onClick={toggleMenu}
                >
                  Create Blog
                </Link>
                <Link
                  to="/my-blogs"
                  className="cursor-pointer text-greenOne font-medium self-center md:hidden block sm:block border-b border-grayOne px-2 py-1"
                  onClick={toggleMenu}
                >
                  My Blogs
                </Link>
                <Link
                  to="/"
                  className="cursor-pointer text-red font-medium self-center md:hidden block sm:blocK px-2 py-1"
                  onClick={() => toggleAndLogout()}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/register"
              className={`cursor-pointer border-2 rounded border-greenOne text-greenOne font-medium text-lg px-2 py `}
              // onClick={()=>{setActiveTab("Register")}}

            >
              Register
            </Link>
            <Link
              to="/login"
              className={`cursor-pointer border-2 rounded border-greenOne text-greenOne font-medium text-lg px-2 py `}
              // onClick={()=>{setActiveTab("Login")}}

            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
