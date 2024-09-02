import React, { useContext, useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { UserContext } from "../store/UserContext";
import { FaStarOfLife } from "react-icons/fa6";
import { StoreContext } from "../store/StoreContext";


const Login = () => {
  const {updateUser,setLoggedIn} = useContext(UserContext)
  const {url} = useContext(StoreContext)

  const navigate = useNavigate();
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
  }

  const login = async (event) => {
    
   
    const response = await fetch(url + "/login", {
      method: "POST",
      credentials:"include",
      body: JSON.stringify({email,password}),
      headers: { "Content-type": "application/json" },
    });
    
    if (response.ok) {
      const data = await response.json();
      updateUser(data);
      setLoggedIn(true)
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
