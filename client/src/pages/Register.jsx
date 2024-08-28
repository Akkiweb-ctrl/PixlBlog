import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";

const Register = ({ setLoggedIn }) => {
  const registerInput = useRef(null);
  const navigate = useNavigate();
  const {updateUser} = useContext(UserContext)

  const register = async (event) => {
    event.preventDefault();
    const form = registerInput.current;

    const name = form["name"].value;
    const email = form["email"].value;
    const password = form["password"].value;

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-type": "application/json" },
      credentials : 'include'
    });
    const data = await response.json();
    // updateUser(data.email);
    if (response.ok) {
      updateUser(data)
      navigate("/");
      console.log(data);
      // console.log(data);
    } else {
      console.log(response);
    }
  };
  return (
    <form
      className="flex flex-col w-1/3 m-auto"
      onSubmit={register}
      ref={registerInput}
    >
      <h1 className="font-bold text-xl mb-6 self-center text-greenOne">
        Register
      </h1>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="border border-grayOne rounded-lg p-2 mb-4"
      />
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        className="border border-grayOne rounded-lg p-2 mb-4"
      />
      <input
        type="password"
        name="password"
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

export default Register;
