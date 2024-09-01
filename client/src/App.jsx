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

function App() {

  return (
    <div className="app">
      <Header ></Header>
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/login" element={<Login  />} />
          <Route
            path="/register"
            element={<Register  />}
          />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          <Route path="/my-blogs" element={<YourBlogs />} />
          <Route path="/display-blog/:id" element={<DisplayBlog />} />
        </Routes>
    </div>
  );
}

export default App;
