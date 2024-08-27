import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogsAtom } from "../store/atoms/blogsAtom";
import { useRecoilState } from "recoil";

const CreateBlog = () => {
  const [title,setTitle] = useState('');
  const [category,setCategory] = useState('');
  const [country,setCountry] = useState('');
  const [description,setDescription] = useState('');
  const navigate = useNavigate();
  const [file,setFiles] = useState('');
  const [blogs, setBlogs] =  useRecoilState(blogsAtom)


  const postBlog = async(ev) =>{
    ev.preventDefault();
    const data = new FormData();
    data.set('title',title);
    data.set('category',category);
    data.set('country',country);
    data.set('description',description);
    console.log(file)
    data.set('file',file[0]);
    const response = await fetch("http://localhost:3000/create-blog",{
      method:'POST',
      body:data,
      // JSON.stringify({title,category,country,description,image})
      // headers : {'Content-type':'application/json'},
      credentials:'include'
    })
    // const info = await response.json();
    // console.log(info);
    if(response.ok){
      const data =  await response.json();
      console.log(data);
      // console.log(blogs)
      setBlogs([...blogs,data])
      // console.log(blogs)
      alert("Blog posted");
      navigate('/');
    }
    else{
      alert("Something went wrong");
      console.log(response)
    }
  }
  return (
    <form className="w-3/4 m-auto flex flex-col mb-4" onSubmit={postBlog}>
      <h2 className='mb-4 font-medium text-greenOne text-xl border-b border-grayOne pb-2'>Edit Blog</h2>
      <div className=" mb-4">
        <label htmlFor="title" className="mr-2 self-center ">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter title of your blog"
          className="border border-grayOne rounded w-full p-1"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>
      <div className="flex justify-between gap-6 mb-4 flex-wrap">
        <div className="flex grow">
          <label htmlFor="category" className="mr-2 self-center ">
            Category
          </label>
          <select
            id="category"
            className="border border-grayOne rounded w-full p-1"
            onChange={(e)=>setCategory(e.target.value)}
          >
            <option value={category} selected>Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Gaming">Gaming</option>
          </select>
        </div>
        <div className="flex grow">
          <label htmlFor="country" className="mr-2 self-center ">
            Country
          </label>
          <input
            type="text"
            id="country"
            placeholder="Enter your country"
            className="border border-grayOne rounded w-full p-1"
            value={country}
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
            accept="image/png,image/gif,image/jpg,image/jpeg"
            placeholder="Enter title of your blog"
            className="border border-grayOne rounded w-full p-1"
            // value={file}
            onChange={(e)=>setFiles(e.target.files)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="mr-4 self-center ">
          Description
        </label>
        <textarea
          rows="24"
          type="text"
          id="description"
          placeholder="Enter description of your blog"
          className="border border-grayOne rounded w-full p-1"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
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

export default CreateBlog;
