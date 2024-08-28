import React, { useEffect, useState } from "react";
// import { BlogContext } from "../store/BlogContext";
import { useParams } from "react-router-dom";


const DisplayBlog = () => {
  // const { toDisplay } = useContext(BlogContext);
  const [blogInfo, setBlogInfo] = useState({});
  const {id} = useParams();

  useEffect( ()=>{
    // console.log(id);
     fetch(`http://localhost:3000/display-blog/${id}`)
     .then((response)=>{
      response.json()
      .then((info)=>{
        setBlogInfo(info);
       })
     })
  },[])
  return (
    <div className="w-3/4 m-auto bg-white p-4 rounded-lg shadow-2xl mb-4">
      <div className="mb-4">
        <h2 className="text-greenOne font-medium text-3xl text-center mb-2">{blogInfo.title} </h2>
        <div className="flex flex-col  items-center">
          <div className="font-medium max-w-fit ">{blogInfo.timestamp}</div>
          <div className=" max-w-fit mb-2"> <span>By -</span> <span className="text-greenOne font-medium text-lg"> {blogInfo.author}</span></div>
          <span className="font-medium border-2 rounded-md px-1 border-greenOne">{blogInfo.country}</span>
        </div>
      </div>
      <div className="">
        <img className='h-96 w-full rounded mb-4 object-fill' src={"http://localhost:3000/" + blogInfo.cover} alt="" />
      </div>
      <div dangerouslySetInnerHTML={{__html:blogInfo.description}} className="break-all">
        {/* {toDisplay.description} */}
      </div>
      {/* <ReactQuill
         theme="bubble" 
        //  modules = {modules}
        //  formats={formats}
        readOnly={true}
         value={toDisplay.description}
         onChange={newValue=>setDescription(newValue)} 
         className="bg-white" type="text"/> */}
    </div>
  );
};

export default DisplayBlog;
