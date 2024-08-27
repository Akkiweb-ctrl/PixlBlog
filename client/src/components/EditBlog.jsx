import React, { useContext, useRef, useState } from "react";
import { BlogContext } from "../store/BlogContext";
import { useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { toEdit } = useContext(BlogContext);
  const navigate = useNavigate();
  const updateForm = useRef(null);

  const updateBlog = async (event) => {
    event.preventDefault();
    const form = updateForm.current;
    const title = form["title"].value;
    const category = form["category"].value;
    const country = form["country"].value;
    const description = form["description"].value;
    const image = form["image"].value;

    const response = await fetch("http://localhost:3000/edit-blog", {
      method: "PUT",
      body: JSON.stringify({
        title,
        category,
        country,
        description,
        image,
        id: toEdit._id,
      }),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    if (response.ok) {
      navigate(-1);
      alert("Blog updated");
    }
  };
  return (
    <form
      className="w-3/4 m-auto flex flex-col"
      onSubmit={updateBlog}
      ref={updateForm}
    >
      <h2 className="mb-4 font-medium text-greenOne text-xl border-b border-grayOne pb-2">
        Edit Blog
      </h2>
      <div className=" mb-4">
        <label htmlFor="title" className="mr-2 self-center ">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title of your blog"
          className="border border-grayOne rounded w-full p-1"
          defaultValue={toEdit.title}
        />
      </div>
      <div className="flex justify-between gap-6 mb-4 flex-wrap">
        <div className="flex grow">
          <label htmlFor="category" className="mr-2 self-center ">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="border border-grayOne rounded w-full p-1"
          >
            {/* <option value='' selected>Select Category</option> */}
            <option
              selected={toEdit.category === "Technology" ? true : false}
              value="Technology"
            >
              Technology
            </option>
            <option
              selected={toEdit.category === "Food" ? true : false}
              value="Food"
            >
              Food
            </option>
            <option
              selected={toEdit.category === "Travel" ? true : false}
              value="Travel"
            >
              Travel
            </option>
            <option
              selected={toEdit.category === "Gaming" ? true : false}
              value="Gaming"
            >
              Gaming
            </option>
          </select>
        </div>
        <div className="flex grow">
          <label htmlFor="country" className="mr-2 self-center ">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Enter country"
            className="border border-grayOne rounded w-full p-1"
            defaultValue={toEdit.country}
          />
        </div>
        <div className="flex grow">
          <label htmlFor="image" className="mr-2 self-center ">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png,image/gif,image/jpg,image/jpeg"
            placeholder="Enter title of your blog"
            className="border border-grayOne rounded w-full p-1"
            defaultValue={toEdit.image}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="mr-4 self-center ">
          Description
        </label>
        <textarea
          rows="20"
          type="text"
          name="description"
          id="description"
          placeholder="Enter description of your blog"
          className="border border-grayOne rounded w-full p-1"
          defaultValue={toEdit.description}
        />
      </div>
      <div className="self-end">
        <input
          type="submit"
          className="rounded bg-greenOne px-4 py-1 text-white font-medium cursor-pointer"
        />
      </div>
    </form>
  );
};

export default EditBlog;
