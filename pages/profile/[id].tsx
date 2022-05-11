import { UserCircleIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { NoPostsViewerIcon, PhotoCard } from '../../Components'
import { InnerJoinPost } from '../../Types'

interface Props {
  data: [InnerJoinPost]
  viewedUser: any
}

export default function id({ data, viewedUser }: Props) {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user)
  console.log(viewedUser.user_id, data, user)

  if (viewedUser.user_id) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center">
        <section className="relative flex w-full max-w-screen-2xl flex-col items-center justify-center">
          <div className="relative top-0 flex h-96 w-full items-center justify-center bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF]">
            <section className=" mt-16 flex h-32 w-10/12 justify-between rounded bg-white p-10">
              <div className="flex items-center space-x-5">
                <div>
                  {viewedUser &&
                  viewedUser.profile_picture &&
                  (!user || user.fullname !== viewedUser.fullname) ? (
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
                  <h1 className="text-xl">
                    {viewedUser && viewedUser.fullname}
                  </h1>
                  <h1 className="text-gray-500">
                    {viewedUser && viewedUser.email}
                  </h1>
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
    )
  } else {
    return (
      <div className="flex-cols flex h-screen w-full items-center justify-center">
        <div className="w-1/2 text-center">
          <h1 className="mb-2 text-2xl font-semibold">
            This user does not exist
          </h1>
          <p className="mb-5">To return to stories click here</p>
          <button
            onClick={() => router.push('/stories')}
            className="cursor-pointer bg-black px-3 py-2 font-medium tracking-widest text-white transition duration-300 ease-in-out hover:bg-opacity-40"
          >
            STORIES
          </button>
        </div>
      </div>
    )
  }
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
      viewedUser: viewedUser?.data?.account || viewedUser,
    },
  }
}
