import React from 'react'
import { Link } from 'react-router-dom'

const NoMyBlogs = () => {
  return (
    <div className="w-3/4 mx-auto flex flex-col items-center mt-4">
      <p className='font-medium'>
        You don't any blogs. Please create one
      </p>
      <Link to='/create-blog'  className='bg-greenOne p-2 mt-2 rounded-lg text-white font-medium'>Create Blog</Link>
    </div>
  )
}

export default NoMyBlogs
