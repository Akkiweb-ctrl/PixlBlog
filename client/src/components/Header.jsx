import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

import { UserContext } from "../store/UserContext";
import TopBlogList from "./TopBlogList";

const Header = () => {
  const { user, updateUser } = useContext(UserContext);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [displayTopBlogList, setDisplayTopBlogList] = useState(false);

  const toggleMenu = () => {
    setDisplayMenu(!displayMenu);
    // console.log(displayMenu);
  };
  const toggleAndLogout = () => {
    logout();
    toggleMenu();
  };
  const toggleTopBlogsAndMenu = () => {
    setDisplayTopBlogList(!displayTopBlogList);
  };
  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        updateUser(data);
        // setLoggedIn(true)
        // consolelog(data);
      });
    });
  }, []);
  const logout = () => {
    // console.log(data);
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    }).then((response) => {
      response.json().then((data) => {
        updateUser(data);
      });
    });
  };
  return (
    <div className="w-full sticky top-0 bg-white min-w-fit">
      <div className="p-4 flex justify-between border-b border-headerGray">
        <Link to="/" className="font-extrabold text-4xl text-greenOne" onClick={()=>{setActiveTab("")}}>
          PixlBlog
        </Link>
        {user._id ? (
          <div className="flex gap-4">
            <div className=" gap-4  hidden sm:hidden md:flex">
              {/* <Link
                to="/my-blogs"
                className="cursor-pointer text-greenOne font-medium self-center"
              >
                Top Blogs
              </Link> */}
              <Link
                to="/create-blog"
                className={`createBlogTab cursor-pointer text-greenOne font-medium self-center px-4 ${activeTab==="CreateBlog" ? "bg-app-bg rounded-lg":""}`}
                onClick={()=>{setActiveTab("CreateBlog")}}
              >
                Create Blog
              </Link>
              <Link
                to="/my-blogs"
                className={`cursor-pointer text-greenOne font-medium px-4 self-center ${activeTab==="MyBlogs" ? "bg-app-bg rounded-lg":""}`}
                onClick={()=>{setActiveTab("MyBlogs")}}
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
                    // to="/top-blogs"
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
              className={`cursor-pointer border-2 rounded border-greenOne text-greenOne font-medium text-lg px-2 py ${activeTab==="Register" ? "bg-app-bg rounded-t-lg":""}`}
              onClick={()=>{setActiveTab("Register")}}

            >
              Register
            </Link>
            <Link
              to="/login"
              className={`cursor-pointer border-2 rounded border-greenOne text-greenOne font-medium text-lg px-2 py ${activeTab==="Login" ? "bg-app-bg rounded-t-lg":""}`}
              onClick={()=>{setActiveTab("Login")}}

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
