import { useRouter } from 'next/router'
import React from 'react'
import { PlusIcon } from '@heroicons/react/solid'

export const CreatePostIcon = () => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push('/create')}
      className="h-15 w-15 lg:h-18 lg:w-18 fixed bottom-5 right-5 flex cursor-pointer items-center justify-center rounded-full bg-[#111] p-2 shadow-xl 2xl:hidden"
    >
      <PlusIcon className="h-12 w-12 text-white" />
    </div>
  )
}
