import React, { useContext, useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { UserContext } from "../store/UserContext";
import { FaStarOfLife } from "react-icons/fa6";


const Login = () => {
  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();
  // const loginInput = useRef(null);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errors,setErrors] = useState();
  const [formData , setFormData] = useState({
    email:"",
    password:""
  });

  const validationSchemma = Yup.object({
    email :Yup.string().required("email is required").email("Invalid email format"),
    password :Yup.string()
    .required("password is required")
    .matches(/[!@#$%^&*()<>?";:{}|]/,"Password must contain atleast one symbol")
    .matches(/[0-9]/,"Password must contain atleast one number")
    .matches(/[a-z]/,"Password must contain atleast one lowercase character")
    .matches(/[A-Z]/,"Password must contain atleast one uppercase character")
    .min(8,"Password must be atleast 8 characters long")


    // category :Yup.string().required("category is required"),
    // description :Yup.string().required("description is required"),
    // file: Yup.mixed().required('required')
    // .test('fileFormat', 'Only image/png,image/gif,image/jpg,image/jpeg files are allowed', value => {
    //   if (value) {
    //     const supportedFormats = ["png","gif","jpg","jpeg"];
    //     return supportedFormats.includes(value.name.split('.').pop());
    //   }
    //   return true;
    // })
    // .test('fileSize', 'File size must not be more than 3MB', 
    // value => {
    //   if (value) {
    //     return value.size <= 3145728;
    //   }
    //   return true;
    // }),
  })

  const handleSubmit = async (event) =>{
    event.preventDefault();
    let newData = {email:email, password};
    try{
      await validationSchemma.validate({email,password},{ abortEarly:false})
      login();
    }catch(error){
      let newErrors = {}
      console.log(error)
      error.inner.forEach((err)=>{
        newErrors[err.path]= err.message;
        setErrors(newErrors);
        console.log(errors)
        // setSubmitting(false)
      })
    }

    // const form = loginInput.current;
    
      // const email= form["email"].value
      // const password= form["password"].value
      // setFormData(newData)
      // console.log(formData);
  }

  const login = async (event) => {
    
   
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      credentials:"include",
      body: JSON.stringify({email,password}),
      headers: { "Content-type": "application/json" },
    });
    
    if (response.ok) {
      const data = await response.json();
      updateUser(data)
      navigate("/");
      console.log(data);
    }
    else{
      console.log(response);
      alert("wrong credentials");
    }
  };
  return (
    <form
      className="flex flex-col w-1/3 m-auto"
      onSubmit={handleSubmit}
      // ref={loginInput}
    >
      <h1 className="font-bold text-xl my-6 self-center text-greenOne">
        Login
      </h1>
      <label htmlFor="title" className="mr-2 mb self-start flex">
        <span>Email Id</span>
        <sup className="text-2xs text-red"><FaStarOfLife /></sup>
        </label>
      <input
        name="email"
        type="text"
        placeholder="Enter email"
        className="border border-grayOne rounded-lg p-2 "
        onChange={(ev)=>setEmail(ev.target.value)}
      />
      {errors && errors.email && <p className="text-red">{errors.email}</p>}

      <label htmlFor="title" className="mt-4 mr-2 mb self-start flex">
        <span>Password</span>
        <sup className="text-2xs text-red"><FaStarOfLife /></sup>
        </label>
      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        className="border border-grayOne rounded-lg p-2 "
        onChange={(ev)=>setPassword(ev.target.value)}
      />
      {errors && errors.password && <p className="text-red">{errors.password}</p>}
      <input
        type="submit"
        className=" mt-4 bg-greenOne text-white font-bold rounded-lg p-2 cursor-pointer"
      />
    </form>
  );
};

export default Login;
