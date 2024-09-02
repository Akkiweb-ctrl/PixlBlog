import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../store/StoreContext";


const DisplayBlog = () => {
  const [blogInfo, setBlogInfo] = useState({});
  const {id} = useParams();
  const {url} = useContext(StoreContext)


  useEffect( ()=>{
     fetch(`${url}display-blog/${id}`)
     .then((response)=>{
      response.json()
      .then((info)=>{
        setBlogInfo(info);
       })
     })
  },[])
  return (
    <div className="w-3/4 mx-auto bg-white p-4 rounded-lg shadow-2xl my-4 h-screen overflow-y-scroll no-scrollbar">
      <div className="mb-4">
        <h2 className="text-greenOne font-medium text-3xl text-center mb-2">{blogInfo.title} </h2>
        <div className="flex flex-col  items-center">
          <div className="font-medium max-w-fit ">{blogInfo.timestamp}</div>
          <div className=" max-w-fit mb-2"> <span>By -</span> <span className="text-greenOne font-medium text-lg"> {blogInfo.author}</span></div>
          <span className="font-medium border-2 rounded-md px-1 border-greenOne">{blogInfo.country}</span>
        </div>
      </div>
      <div className="">
        <img className='h-96 w-full rounded mb-4 object-fill' src={url + blogInfo.cover} alt="url" />
      </div>
      <div dangerouslySetInnerHTML={{__html:blogInfo.description}} className="break-all">
      </div>
   
    </div>
  );
};

export default DisplayBlog;
