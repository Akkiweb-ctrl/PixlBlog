import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import UserContextProvider from "./store/UserContext";
// import BlogContextProvider from "./store/BlogContext.jsx";
import { RecoilRoot } from "recoil";
import StoreContextProvider from "./store/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <StoreContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContextProvider>
      </StoreContextProvider>
    </RecoilRoot>
  </StrictMode>
);
