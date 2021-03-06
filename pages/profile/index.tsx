import axios from 'axios'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import { InnerJoinPost } from '../../Types'
import {
  AnnotationIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import { NoPostsIcon, PhotoCard, PfpOverlay } from '../../Components'

interface Props {
  data: [InnerJoinPost]
}

export default function profile({ data }: Props) {
  const user = useSelector((state: any) => state.user.user)
  console.log(data, user)

  const [openProfilePhoto, setProfilePhoto] = useState(false)
  useEffect(() => {
    if (!user) window.location.replace('/signin')
  })

  const closeModal = () => {
    setProfilePhoto(false)
  }

  return (
    <>
      {openProfilePhoto && <PfpOverlay closeModal={closeModal} />}
      <div className="flex min-h-screen w-full flex-col items-center">
        <section className="relative flex w-full max-w-screen-2xl flex-col items-center justify-center">
          <div className="relative top-0 flex h-96 w-full items-center justify-center bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF]">
            <section className="mt-20 sm:mt-16 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:h-32 w-10/12 sm:justify-between rounded bg-white p-10">
              <div className="flex items-center space-x-5">
                <div>
                  {user && user.profile_picture ? (
                    <img
                      onClick={() =>
                        openProfilePhoto
                          ? setProfilePhoto(false)
                          : setProfilePhoto(true)
                      }
                      className="h-24 w-24 cursor-pointer rounded-full"
                      src={user.profile_picture}
                      alt=""
                    />
                  ) : (
                    <UserCircleIcon
                      onClick={() =>
                        openProfilePhoto
                          ? setProfilePhoto(false)
                          : setProfilePhoto(true)
                      }
                      className="w-22 h-24 cursor-pointer"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl">{user && user.fullname}</h1>
                  <h1 className="text-gray-500">{user && user.email}</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <HeartIcon className="h-8 w-8 text-gray-300" />
                  <h1 className="text-xl">10</h1>
                </div>
                <div className="flex items-center space-x-1">
                  <ShareIcon className="h-8 w-8 text-gray-300" />
                  <h1 className="text-xl">5</h1>
                </div>
                <div className="flex items-center space-x-1">
                  <AnnotationIcon className="h-8 w-8 text-gray-300" />
                  <h1 className="text-xl">8</h1>
                </div>
                <div className='flex items-center space-x-1'>
                  <EyeIcon className='h-8 w-8 text-gray-300' />
                  <h1 className="text-xl">3</h1>
                </div>
              </div>
            </section>
          </div>
          {data.length > 0 ? (
            <div className="relative w-full md:grid md:grid-cols-2  xl:grid-cols-4">
              {data &&
                data.map((item: InnerJoinPost, index) => (
                  <PhotoCard
                    user_id={item.user_id}
                    key={index}
                    creator={item.fullname}
                    postId={item.post_id}
                    src={item.photo}
                    title={item.title}
                    createdAt={item.created_on}
                    profile_picture={item.profile_picture}
                  />
                ))}
            </div>
          ) : (
            <NoPostsIcon />
          )}
        </section>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let data: any = []
  try {
    if (req.cookies) {
      data = await axios.post<Array<InnerJoinPost>>(
        `http://localhost:3000/api/post/read/specific`,
        { data: { cookie: req.cookies } }
      )
    }
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      data: data!.data?.posts || data,
    },
  }
}
