import { createContext, useState } from "react";

export const BlogContext = createContext({});

const BlogContextProvider = ({ children }) => {
  const [toEdit, setToEdit] = useState({});
  const [toDisplay, setToDisplay] = useState({});
  const contextValue = {
    toEdit,
    setToEdit,
    toDisplay,
    setToDisplay
  };
  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};
export default BlogContextProvider;
