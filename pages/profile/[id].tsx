import { UserCircleIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import { useSelector } from 'react-redux'
import { NoPostsViewerIcon, PhotoCard } from '../../Components'
import { InnerJoinPost } from '../../Types'

interface Props {
  data: [InnerJoinPost]
  viewedUser: any
}

export default function id({ data, viewedUser }: Props) {
  const user = useSelector((state: any) => state.user.user)
  console.log(viewedUser, data, user)
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center">
        <section className="relative flex w-full max-w-screen-2xl flex-col items-center justify-center">
          <div className="relative top-0 flex h-96 w-full items-center justify-center bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF]">
            <section className=" mt-16 flex h-32 w-10/12 justify-between rounded bg-white p-10">
              <div className="flex items-center space-x-5">
                <div>
                  {viewedUser && viewedUser.profile_picture && ( !user || user.fullname !== viewedUser.fullname ) ? (
                    <img
                      className="h-24 w-24 cursor-pointer rounded-full"
                      src={viewedUser.profile_picture}
                      alt=""
                    />
                  ) : (
                    <UserCircleIcon className="w-22 h-24 cursor-pointer" />
                  )}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl">{viewedUser && viewedUser.fullname}</h1>
                  <h1 className="text-gray-500">{viewedUser && viewedUser.email}</h1>
                </div>
              </div>
              <div>
                <h1>metrics</h1>
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
            <NoPostsViewerIcon />
          )}
        </section>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let data: any = []
  let viewedUser: any = {}

  try {

    data = await axios.post<Array<InnerJoinPost>>(
      `http://localhost:3000/api/post/read/specific`,
      { data: { cookie: { id: params!.id } } }
    )

    viewedUser = await axios.post<any>(
      `http://localhost:3000/api/account/get`,
      { data: { id: { user: params!.id } } }
    )

    console.log(viewedUser)
  } catch (e: any) {
    console.log(e.message)
  }
  return {
    props: {
      data: data!.data?.posts || data,
      viewedUser: viewedUser.data.account || viewedUser,
    },
  }
}
