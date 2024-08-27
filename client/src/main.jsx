import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import UserContextProvider from "./store/UserContext";
import BlogContextProvider from "./store/BlogContext.jsx";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <UserContextProvider>
        <BlogContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BlogContextProvider>
      </UserContextProvider>
      </RecoilRoot>
  </StrictMode>
);
