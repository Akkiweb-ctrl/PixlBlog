import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./components/CreateBlog";
import YourBlogs from "./pages/YourBlogs";
import EditBlog from "./components/EditBlog";
import DisplayBlog from "./pages/DisplayBlog";
// import {blogLoader}  from './pages/YourBlogs'

function App() {
  // const [displayLogin, setdisplayLogin] = useState(true)
  // const [displayRegister, setdisplayRegister] = useState(true)

  return (
    <div>
      <Header ></Header>
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/login" element={<Login  />} />
          <Route
            path="/register"
            element={<Register  />}
          />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-blog" element={<EditBlog />} />
          <Route path="/my-blogs" element={<YourBlogs />} />
          <Route path="/display-blog" element={<DisplayBlog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
