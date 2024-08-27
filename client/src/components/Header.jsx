import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../store/UserContext";

const Header = () => {
  const { user, updateUser } = useContext(UserContext);
  // const [loggedIn, setLoggedIn] = useState(false);

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
  },[]);
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
    <div className="w-full sticky top-0 bg-white">
      <div className="p-4 flex justify-between border-b border-headerGray">
        <Link to="/" className="font-extrabold text-3xl text-greenOne">
          PixlBlog
        </Link>
        {user._id ? (
          <div className="flex gap-4">
            <Link
              to="/create-blog"
              className="cursor-pointer text-greenOne font-medium self-center"
            >
              Create Blog
            </Link>
            <Link
              to="/my-blogs"
              className="cursor-pointer text-greenOne font-medium self-center"
            >
              My Blogs
            </Link>
            <Link
              to="/"
              className="cursor-pointer text-red font-medium self-center"
              onClick={() => logout()}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/register"
              className="cursor-pointer border-2 rounded border-greenOne text-greenOne font-medium text-lg px-2 py"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="cursor-pointer rounded bg-greenOne text-lg text-white font-medium px-2 py"
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
