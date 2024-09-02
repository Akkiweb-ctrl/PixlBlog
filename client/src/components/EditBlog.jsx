import React, {  useContext, useEffect, useState } from "react";
// import { BlogContext } from "../store/BlogContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as Yup from 'yup'

import Editor from "./Editor";
import { StoreContext } from "../store/StoreContext";

const EditBlog = () => {
  const {id} = useParams();
  const { url } = useContext(StoreContext);
  const [blogInfo, setBlogInfo] = useState({});
  const navigate = useNavigate();
  const [description,setDescription] = useState("");
  const [title,setTitle] = useState("");
  const [category,setCategory] = useState("");
  const [country,setCountry] = useState("");
  const [fileValue,setFiles] = useState('');
  const [errors, setErrors] = useState();

 
  
  useEffect(()=>{
    fetch(`${url}edit-blog/${id}`)
    .then((response)=>{
      response.json()
      .then((info)=>{
        setBlogInfo(info)
        setTitle(info.title)
        setCategory(info.category)
        setCountry(info.country)
        setDescription(info.description)
      })
    })
  },[])
 
  const validationSchemma = Yup.object({
    title :Yup.string().required("title is required"),
    country :Yup.string().required("country is required"),
    category :Yup.string().required("category is required"),
    description :Yup.string().required("description is required"),
    file: Yup.mixed()
    .test('fileFormat', 'Only image/png,image/gif,image/jpg,image/jpeg files are allowed', value => {
      if (value) {
        const supportedFormats = ["png","gif","jpg","jpeg"];
        return supportedFormats.includes(value.name.split('.').pop());
      }
      return true;
    })
    .test('fileSize', 'File size must not be more than 3MB', 
    value => {
      if (value) {
        return value.size <= 3145728;
      }
      return true;
    }),
  })
  const onSubmitHandler = async (ev) =>{
    ev.preventDefault();
    console.log(title)
      try{
      await validationSchemma.validate({title,country,category,description:description.replace(/<(.|\n)*?>/g, ''),file:fileValue[0]},{ abortEarly:false});
      updateBlog();
    }catch(error){
      let newErrors = {}
      console.log(error)
      error.inner.forEach((err)=>{
        newErrors[err.path]= err.message;
        setErrors(newErrors);
        console.log(errors)
      })
    }
    
  }
    


  const updateBlog = async (event) => {
    

    const response = await fetch(`${url}/edit-blog`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        category,
        country,
        description,
        file:fileValue[0],
        id,

      }),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    if (response.ok) {
      navigate("/");
      alert("Blog updated");
    }
  };
  return (
    <form
      className="w-3/4 m-auto h-screen flex flex-col overflow-y-scroll no-scrollbar"
      onSubmit={onSubmitHandler}
      
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
        <Editor 
        onChange = {setDescription}
         value={description}></Editor>
        
      </div>
      <div className="self-end">
        <button
          type="submit"
          className="rounded bg-greenOne px-4 py-1 text-white font-medium cursor-pointer"
        > Save </button>
      </div>
    </form>
  );
};

export default EditBlog;
