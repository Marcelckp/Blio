import Image from 'next/image'
import React from 'react'
import { whiteArrow } from '../public/assets/shared/desktop/arrow'
import mnt from 'moment'
import { UserCircleIcon } from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

interface Props {
  creator: string
  postId: number | string
  createdAt: number | string
  title: string
  src: string
  profile_picture?: string
  user_id: any
}

export const PhotoCard = ({
  creator,
  postId,
  title,
  createdAt,
  src,
  user_id,
  profile_picture,
}: Props) => {
  const time = mnt(+createdAt.toString().replaceAll(',', ''))
  const user = useSelector((state: any) => state.user.user)
  const router = useRouter()
  return (
    <div
      className={`relative flex h-[600px] w-full cursor-pointer items-center justify-center  bg-cover bg-no-repeat object-fill transition-all duration-300 ease-in-out hover:-translate-y-10`}
    >
      <Image
        quality={100}
        className="-z-10"
        src={src}
        layout="fill"
        objectFit="cover"
      />
      <div
        className="flex h-full w-full items-end justify-center bg-gradient-to-b from-[#fff0] to-[#00000080]"
      >
        <div className="w-10/12 py-5 text-white">
          <div className=" border-b-[1px] border-gray-500 py-5">
            <p className="py-1 text-sm">{time.format('DD MMM YYYY')}</p>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <div
              onClick={() =>
                user && user.fullname === creator
                  ? ''
                  : router.push(`/profile/${user_id}`)
              }
              className="mt-2 flex items-center space-x-2"
            >
              {user && user.fullname === creator ? (
                <h1>Created by you</h1>
              ) : (
                <div>
                  {profile_picture ? (
                    <Image
                      className="cursor-pointer rounded-full"
                      src={profile_picture}
                      width="24px"
                      height="24px"
                      priority
                    />
                  ) : (
                    <UserCircleIcon className="h-8 w-8" />
                  )}
                </div>
              )}
              {user && user.fullname === creator ? (
                ''
              ) : (
                <p className="py-1 text-sm">
                  {creator.slice(0, 1).toUpperCase() + creator.slice(1)}
                </p>
              )}
            </div>
          </div>
          <div
            className="flex w-full items-center justify-between py-4 z-10"
            onClick={() => {
              router.push(`/stories/${postId}`)
            }}
          >
            <h2
              className="text-base tracking-widest z-10"
              onClick={() => {
                router.push(`/stories/${postId}`)
              }}
            >
              VIEW STORY
            </h2>
            {whiteArrow}
          </div>
        </div>
      </div>
    </div>
  )
}
