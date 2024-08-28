import React, { useContext, useRef } from "react";
import { json, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";

const Login = ({ setLoggedIn }) => {
  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();
  const loginInput = useRef(null);

  const login = async (event) => {
    event.preventDefault();
    const form = loginInput.current;
    
      const email= form["email"].value
      const password= form["password"].value
   
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
      onSubmit={login}
      ref={loginInput}
    >
      <h1 className="font-bold text-xl mb-6 self-center text-greenOne">
        Login
      </h1>
      <input
        name="email"
        type="text"
        placeholder="Enter email"
        className="border border-grayOne rounded-lg p-2 mb-4"
      />
      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        className="border border-grayOne rounded-lg p-2 mb-4"
      />
      <input
        type="submit"
        className=" bg-greenOne text-white font-bold rounded-lg p-2 cursor-pointer"
      />
    </form>
  );
};

export default Login;
