import React from 'react'
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";

const Editor = ({value,onChange}) => {
    const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, 7, false] }],
          ["bold", "italic", "underline", "strike", ],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }],
          ["link", "image"],
          ["clean"],
        ],
      };
      const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blackquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
      ];
  return (
    <div className=''>
      <ReactQuill
          theme="snow"
          modules={modules}
          value={value}
          onChange={onChange} 
          className="bg-white"
      
        />
    </div> 
    
  )
}

export default Editor