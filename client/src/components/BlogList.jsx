import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs}) => {

  
  return (
    // <div className='w-3/5'>
    <div className='flex flex-col'>
    {blogs.map((blog)=>{
      return <Blog key={blog.timestamp} blog = {blog}></Blog>
    })}
    
    </div>
    
    // {/* </div> */}
  )
}

export default BlogList