import React from 'react'
import { useRouter } from 'next/router'

export const NoPostsIcon = () => {
const router = useRouter()
  return (
    <div className="flex flex-cols w-full h-72 items-center justify-center">
      <div className='w-1/2 text-center'>
        <h1 className="text-2xl font-semibold mb-5">You have not created any posts as yet.</h1>
        <p className="mb-5">To create a post click here</p>
        <button className='cursor-pointer bg-black px-3 py-2 font-medium tracking-widest text-white transition duration-300 ease-in-out hover:bg-opacity-40'>CREATE POST</button>
      </div>
    </div>
  )
}
