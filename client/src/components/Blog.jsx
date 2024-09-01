import { IoIosTimer } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatISO9075 } from "date-fns";

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { BlogContext } from "../store/BlogContext";
import { useRecoilState } from "recoil";
// import { myBlogsAtom } from "../store/atoms/myBlogsAtom";
import { UserContext } from "../store/UserContext";
import { blogsAtom } from "../store/atoms/blogsAtom";
import { myBlogsAtom } from "../store/atoms/myBlogsAtom";

const Blog = ({ blog }) => {
  const [blogs, setBlogs] = useRecoilState(blogsAtom);
  const [myBlogs, setMyBlogs] = useRecoilState(myBlogsAtom);
  const { user, updateUser } = useContext(UserContext);
  const deleteBlog = async () => {
    const id = blog._id;
    const response = await fetch("http://localhost:3000/delete-blog", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    if (response.ok) {
      alert("Blog deleted");
      setBlogs(blogs.filter((item) => item._id !== id));
      setMyBlogs(myBlogs.filter((item) => item._id !== id));
    }
  };

  return (
    <div className="flex flex-col sm-flex-col lg:flex-row gap-2 justify-end blog mb-4">
      <Link
        to={`/display-blog/${blog._id}`}
        onClick={() => setToDisplay(blog)}
        className="grow"
      >
        <div className=" flex flex-col sm:flex-col lg:flex-row rounded-lg shadow-2xl min-w-fit bg-white cursor-pointer  ">
          <img
            src={"http://localhost:3000/" + blog.cover}
            alt="image"
            className="sm:w-full lg:max-w-72 w-full sm:rounded-t-lg rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg border-r-none h-60"
          />
          <div className=" flex-col p-6 w-full items-start justify-center max-h-60 overflow-y-scroll no-scrollbar">
            <div className="flex gap-2 mb-2 w-fit">
              <span className="self-center text-greenOne">
                <IoIosTimer />
              </span>
              <span className="font-light">
                {formatISO9075(new Date(blog.timestamp))}
              </span>{" "}
            </div>
            <div className="text-lg font-medium mb-2 text-greenOne ">
              {blog.title}
            </div>
            <div className="font-light mb-2 ">{blog.category}</div>
            <div
              className="px-1 text-white rounded font-medium
           bg-greenOne  w-fit mb-2 "
            >
              {blog.country}
            </div>
            <p>
              By -
              <span className="font-medium text-greenOne"> {blog.author}</span>
            </p>
          </div>
        </div>
      </Link>
      {blog.authorId === user._id && (
        <div className="flex flex:row lg:flex-col lg:justify-start justify-end gap-4 mb-4 ">
          <Link
            to={`/edit-blog/${blog._id}`}
            className="text-greenOne font-medium cursor-pointer "
            onClick={() => setToEdit(blog)}
          >
            <FaEdit />
          </Link>
          <span
            className="text-red font-medium cursor-pointer"
            onClick={deleteBlog}
          >
            <MdDelete />
          </span>
        </div>
      )}
    </div>
  );
};

export default Blog;
