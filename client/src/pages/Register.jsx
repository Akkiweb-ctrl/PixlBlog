import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { UserContext } from "../store/UserContext";
import { FaStarOfLife } from "react-icons/fa6";


const Register = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const [errors,setErrors] = useState();
  const {updateUser} = useContext(UserContext)

  const validationSchemma = Yup.object({
    name :Yup.string().min(2,"Name should contain at least 2 characters").required("Name is required"),
    email :Yup.string().required("Email is required").email("Invalid email format"),
    password :Yup.string()
    .matches(/[!@#$%^&*()<>?";:{}|]/,"Password must contain atleast one symbol")
    .matches(/[0-9]/,"Password must contain atleast one number")
    .matches(/[a-z]/,"Password must contain atleast one lowercase character")
    .matches(/[A-Z]/,"Password must contain atleast one uppercase character")
    .min(8,"Password must be atleast 8 characters long")
    .required("Password is required")

  })

  const handleSubmit = async (event) =>{
    event.preventDefault();
    try{
      await validationSchemma.validate({name,email,password},{ abortEarly:false})
      register();
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

  const register = async (event) => {

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-type": "application/json" },
      credentials : 'include'
    });
    const data = await response.json();
    if (response.ok) {
      updateUser(data)
      navigate("/");
      console.log(data);
    } else {
      console.log(response);
    }
  };
  return (
    <form
      className="flex flex-col w-1/3 m-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-xl mt-4 self-center text-greenOne">
        Register
      </h1>
      <label htmlFor="title" className="mr-2 mb mt-4 self-start flex">
        <span>Full Name</span>
        <sup className="text-2xs text-red"><FaStarOfLife /></sup>
        </label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="border border-grayOne rounded-lg p-2"
        onChange={(ev)=>setName(ev.target.value)}
      />
      {errors && errors.name && <p className="text-red">{errors.name}</p>}

      <label htmlFor="title" className="mr-2 mb mt-4  self-start flex">
        <span>Email Id</span>
        <sup className="text-2xs text-red"><FaStarOfLife /></sup>
        </label>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        className="border border-grayOne rounded-lg p-2"
        onChange={(ev)=>setEmail(ev.target.value)}
      />
      {errors && errors.email && <p className="text-red">{errors.email}</p>}

      <label htmlFor="title" className="mr-2 mb mt-4 self-start flex">
        <span>Password</span>
        <sup className="text-2xs text-red"><FaStarOfLife /></sup>
        </label>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        className="border border-grayOne rounded-lg p-2 "
        onChange={(ev)=>setPassword(ev.target.value)}
      />
      {errors && errors.password && <p className="text-red">{errors.password}</p>}

      <input
        type="submit"
        className="mt-4 bg-greenOne text-white font-bold rounded-lg p-2 cursor-pointer"
      />
    </form>
  );
};

export default Register;
