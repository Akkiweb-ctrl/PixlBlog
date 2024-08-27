import { IoIosTimer } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatISO9075 } from "date-fns";

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlogContext } from "../store/BlogContext";
import { useRecoilState } from "recoil";
// import { myBlogsAtom } from "../store/atoms/myBlogsAtom";
import { UserContext } from "../store/UserContext";
import { blogsAtom } from "../store/atoms/blogsAtom";
import { myBlogsAtom } from "../store/atoms/myBlogsAtom";

const Blog = ({ blog }) => {
  const { setToEdit, setToDisplay } = useContext(BlogContext);
  const [blogs, setBlogs] = useRecoilState(blogsAtom);
  const [myBlogs, setMyBlogs] = useRecoilState(myBlogsAtom);
  const { user, updateUser } = useContext(UserContext);

  // const navigate = useNavigate();
  const handleOnClick = (toEdit) => {
    console.log(toEdit);
  };
  const deleteBlog = async () => {
    const id = blog._id;
    // console.log(id)
    const response = await fetch("http://localhost:3000/delete-blog", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    // console.log(response)
    if (response.ok) {
      // const data = await response.json();
      alert("Blog deleted");
      setBlogs(blogs.filter((item) => item._id !== id));
      setMyBlogs(myBlogs.filter((item) => item._id !== id));
      // navigate(this.);
    }
  };
  // console.log(blog.author);
  // console.log(user._id);
  return (
    <div className="flex gap-2">
    <Link to="/display-blog" onClick={() => setToDisplay(blog)} className="grow">
      <div className="flex  rounded-r-lg shadow-2xl min-w-fit bg-white cursor-pointer">
        <img
          src={"http://localhost:3000/" + blog.cover}
          // src="./assest/img1.png"
          alt="image"
          className="max-w-72 rounded-l-lg border-r-none"
        />
        <div className=" flex-col p-6 w-full">
          <div>
            <div className="flex gap-2 mb-2">
              <span className="self-center text-greenOne">
                <IoIosTimer />
              </span>
              <span className="font-light">
                {formatISO9075(new Date(blog.timestamp))}
              </span>{" "}
            </div>
          </div>
          <p className="text-lg font-medium mb-2 text-greenOne">{blog.title}</p>
          <p className="font-light mb-2">{blog.category}</p>
          <p className="px-0.5 rounded border-2 inline-block mb-2">
            {blog.country}
          </p>
          <p>By - {blog.author}</p>
        </div>
      </div>
    </Link>
    {blog.authorId===user._id && <div className="flex flex-col justify-start gap-4 ">
      <Link to="/edit-blog"className="text-greenOne font-medium cursor-pointer "onClick={()=>setToEdit(blog)}>
        <FaEdit />
      </Link>
      <span className="text-red font-medium cursor-pointer" onClick={deleteBlog}>
        <MdDelete />
      </span>
    </div>}
    </div>
  );
};

export default Blog;
