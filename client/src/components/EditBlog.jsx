import React, {  useEffect, useState } from "react";
// import { BlogContext } from "../store/BlogContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Editor from "./Editor";

const EditBlog = () => {
  const {id} = useParams();
  // const { toEdit } = useContext(BlogContext);
  const [blogInfo, setBlogInfo] = useState({});
  const navigate = useNavigate();
  const [description,setDescription] = useState("");
  const [title,setTitle] = useState("");
  const [category,setCategory] = useState("");
  const [country,setCountry] = useState("");
  const [fileValue,setFiles] = useState('');
  // const updateForm = useRef(null);
 
  
  useEffect(()=>{
    fetch(`http://localhost:3000/edit-blog/${id}`)
    .then((response)=>{
      response.json()
      .then((info)=>{
        // console.log(info)
        setBlogInfo(info)
        setTitle(info.title)
        setCategory(info.category)
        setCountry(info.country)
        setDescription(info.description)
        // console.log(info.description);
      })
    })
  },[])
  // console.log(blogInfo)
 
  const updateBlog = async (event) => {
    
    event.preventDefault();
    const data = new FormData();
    data.set('title',title)
    data.set('category',category)
    data.set('country',country)
    data.set('description',description)
    data.set('id',id)
    // const title = form["title"].value;
    // const category = form["category"].value;
    // const country = form["country"].value;
    // const description = descriptionValue
    let file = null
    if(fileValue?.[0]){
      data.set('file',fileValue)
    }
    // console.log(title)
    // console.log(id)

    const response = await fetch(`http://localhost:3000/edit-blog`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        category,
        country,
        description,
        file,
        id,

      }),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    if (response.ok) {
      navigate('/');
      alert("Blog updated");
    }
  };
  return (
    <form
      className="w-3/4 m-auto flex flex-col"
      onSubmit={updateBlog}
      
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
          onChange={(e)=>setTitle(e.target.value)}
          defaultValue={blogInfo.title}
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
            defaultValue={blogInfo.category}
            className="border border-grayOne rounded w-full p-1"
            onChange={(e)=>setCategory(e.target.value)}
          >
            {/* <option value='' selected>Select Category</option> */}
            <option value="DEFAULT" disabled>Choose category</option>
            <option
              value="Technology"
            >
              Technology
            </option>
            <option
              value="Food"
            >
              Food
            </option>
            <option
              value="Travel"
            >
              Travel
            </option>
            <option
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
            defaultValue={blogInfo.country}
            onChange={(e)=>setCountry(e.target.value)}

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
            defaultValue={blogInfo.image}
            onChange={(ev)=>setFiles(ev.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="mr-4 self-center ">
          Description
        </label>
      {/* <div dangerouslySetInnerHTML={{__html:toEdit.description}} className="break-all">
      </div> */}
        {/* <textarea
          rows="20"
          type="text"
          name="description"
          id="description"
          placeholder="Enter description of your blog"
          className="border border-grayOne rounded w-full p-1"
          defaultValue={toEdit.description}
        /> */}
        <Editor 
        onChange = {setDescription}
         value={description}></Editor>
        
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
