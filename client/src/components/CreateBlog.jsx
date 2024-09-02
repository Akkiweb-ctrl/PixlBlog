import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogsAtom } from "../store/atoms/blogsAtom";
import { useRecoilState } from "recoil";
import { FaStarOfLife } from "react-icons/fa6";
import * as Yup from 'yup'
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import { StoreContext } from "../store/StoreContext";

const CreateBlog = () => {

  const [submitting, setSubmitting] = useState(false)
  // const [formData, setFormData] = useState({
  //   title : '',
  //   category : '',
  //   country : '',
  //   description : '',
  //   files : '',
  // });
  const [title,setTitle] = useState('');
  const [category,setCategory] = useState('');
  const [country,setCountry] = useState('');
  const [description,setDescription] = useState('');
  const [files,setFiles] = useState('');
  const [blogs, setBlogs] =  useRecoilState(blogsAtom)
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const {url} = useContext(StoreContext)

  const data = new FormData();


  const modules = {
    toolbar : [
      [{'header':[1,2,3,4,5,6,7,false]}],
      ['bold','italic','underline','strike','blackquote'],
      [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'}],
      ['link','image'],
      ['clean']
    ]
  }
  const formats= [
      'header',
      'bold','italic','underline','strike',
      'list','indent',
      'link','image',
    ]
  
    const validationSchemma = Yup.object({
      title :Yup.string().required("title is required"),
      country :Yup.string().required("country is required"),
      category :Yup.string().required("category is required"),
      description :Yup.string().required("description is required"),
      file: Yup.mixed().required('required')
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
  setSubmitting(true)
    try{
    await validationSchemma.validate({title,country,category,description:description.replace(/<(.|\n)*?>/g, ''),file:files[0]},{ abortEarly:false});
    postBlog();
  }catch(error){
    let newErrors = {}
    console.log(error)
    error.inner.forEach((err)=>{
      newErrors[err.path]= err.message;
      setErrors(newErrors);
      console.log(errors)
      setSubmitting(false)
    })
  }
  
}

  const postBlog = async() =>{
    data.set('title',title);
    data.set('category',category);
    data.set('country',country);
    data.set('description',description);
    data.set('file',files[0]);
    const response = await fetch(url+"create-blog",{
      method:'POST',
      body:data,
      credentials:'include'
    })
    if(response.ok){
      setSubmitting(false);
      const data =  await response.json();
      console.log(data);
      setBlogs([...blogs,data])
      alert("Blog posted");
      navigate(-1);
    }
    else{
      setSubmitting(false);
      alert("Something went wrong");
      console.log(response)
    }
  }
  return (
    <form className="w-3/4 m-auto flex flex-col mb-4 min-w-60" onSubmit={onSubmitHandler}>
      <h2 className='mb-4 font-medium text-greenOne text-xl border-b border-grayOne pb-2'>Edit Blog</h2>
      <div className=" mb-4">
        <label htmlFor="title" className="mr-2 self-center flex">
        <span>Title</span>
        <sup className="text-2xs text-red"><FaStarOfLife /></sup>
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter title of your blog"
          className={`border-2 ${errors && errors.title ?"border-red":"border-grayOne"}  rounded w-full p-1`}
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>
      <div className="flex justify-between gap-6 mb-4 flex-wrap">
        <div className="flex grow">
          <label htmlFor="category" className="mr-2 self-center flex">
          <span>Category</span>
          <sup className="text-2xs text-red"><FaStarOfLife /></sup>
          </label>
          <select
            id="category"
            className={`border-2 ${errors && errors.category?"border-red":"border-grayOne"}  rounded w-full p-1`}
            onChange={(e)=>setCategory(e.target.value)}
          >
            <option defaultValue={category} >Select Category</option>
            <option value="Radhe Radhe">Radhe Radhe</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Gaming">Gaming</option>
          </select>
        </div>
        <div className="flex grow">
          <label htmlFor="country" className="mr-2 self-center flex">
          <span>Country</span>
          <sup className="text-2xs text-red"><FaStarOfLife /></sup>
          </label>
          <input
            type="text"
            id="country"
            placeholder="Enter your country"
            className={`border-2 ${errors && errors.country?"border-red":"border-grayOne"}  rounded w-full p-1`}
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
          />
        </div>
        <div className="flex grow">
          <label htmlFor="image" className="mr-2 self-center flex">
          <span>Image</span>
          <sup className="text-2xs text-red"><FaStarOfLife /></sup>
            
          </label>
          <input
            type="file"
            id="image"
            accept="image/png,image/gif,image/jpg,image/jpeg"
            placeholder="Enter title of your blog"
            className={`border-2 ${errors && errors.file?"border-red":"border-grayOne"}  rounded w-full p-1`}
            onChange={(e)=>setFiles(e.target.files)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="mr-4 self-center flex">
          <span>Description</span>
          <sup className="text-2xs text-red"><FaStarOfLife /></sup>
        </label>
      
        <ReactQuill
         theme="snow" 
         modules = {modules}
         formats={formats}
         value={description}
     
         onChange={newValue=>setDescription(newValue)} 
         className={` ${errors && errors.description?"border-red border-2":"border-grayOne"} bg-white rounded w-full p-1`}/>


      </div>
      <div className="self-end">
        <button
         type="submit"
         className="rounded bg-greenOne px-4 py-1 text-white font-medium cursor-pointer flex">
        {submitting && <svg class="animate-spin h-5 w-5 mr-3 text-white bg-opacity-100" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>}
         Create
          </button>
      </div>
    </form>
  );
};

export default CreateBlog;
