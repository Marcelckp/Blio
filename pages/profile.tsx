import axios from 'axios'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GetStateFromSelectors } from 'reselect/es/types'
import { store } from '../redux/store'
import { InnerJoinPost } from '../Types'
import { UserCircleIcon } from '@heroicons/react/solid'
import { PhotoCard } from '../Components'

interface Props {
  data: [InnerJoinPost]
}

export default function profile({ data }: Props) {
  const user = useSelector((state: any) => state.user.user)
  console.log(data, user)
  useEffect(() => {
    if (!user) window.location.replace('/signin')
  })
  return (
    <div className="flex w-full flex-col min-h-screen items-center">
      <section className="flex w-full relative max-w-screen-2xl flex-col items-center justify-center">
        <div className="relative top-0 flex h-96 w-full items-center justify-center bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF]">
          <section className=" mt-16 flex h-32 w-10/12 justify-between rounded bg-white p-10">
            <div className="flex items-center space-x-5">
              <div>
                {user && user.profile_photo ? (
                  <img src={user.profile_picture} alt="" />
                ) : (
                  <UserCircleIcon className="w-22 h-20" />
                )}
              </div>
              <div className="flex flex-col">
                <h1>{user && user.fullname}</h1>
                <h1>{user && user.email}</h1>
              </div>
            </div>
            <div>
              <h1>metrics</h1>
            </div>
          </section>
        </div>
        <div className="relative w-full md:grid md:grid-cols-2  xl:grid-cols-4">
          {data && data.map((item: InnerJoinPost, index) => <PhotoCard creator={item.fullname} postId={item.post_id} src={item.photo} title={item.title} createdAt={item.created_on}  />
          )}
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // console.log(req.cookies);

  let data: any = []
  try {
    data = await axios.post<Array<InnerJoinPost>>(
      `http://localhost:3000/api/post/read/specific`,
      { data: { cookie: req.cookies } }
    )
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      data: data!.data?.posts,
    },
  }
}
