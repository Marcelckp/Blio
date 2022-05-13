import axios from 'axios'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { db } from '../../models/PGdb'
import hero from '../../public/assets/stories/desktop/rage-of-the-sea.jpg'
import { Router, useRouter } from 'next/router'
import { InnerJoinPost, Post } from '../../Types'

export default function specificStory({
  data: { title, fullname, photo, body, user_id },
  comments
}: any) {
  console.log(comments);
  const router = useRouter()
  return (
    <div className="mt-40 flex w-full flex-col items-center justify-center">
      <div className="flex  w-full max-w-screen-2xl flex-col items-center justify-center">
        <section className=" flex  w-full flex-col lg:flex-row">
          <div className=" relative h-[1000px] w-full">
            <Image
              src={photo}
              layout="fill"
              objectFit="contain"
              priority
              quality={100}
            />
          </div>
          <div className="relative flex min-h-screen w-full flex-grow flex-col items-center overflow-y-scroll p-10">
            <h1 className="mb-10 text-4xl">{title}</h1>
            <h1 className="mb-10 text-4xl">
              By{' '}
              <span
                className="cursor-pointer hover:text-blue-500"
                onClick={() => router.push(`/profile/${user_id}`)}
              >
                {fullname}
              </span>
            </h1>
            <h1>{body}</h1>

            <div className='p-3 w-full mt-10 flex flex-col justify-center gap-2'>
              <textarea className='border p-2 w-full' />
              <button
                className="bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF] h-full p-2 rounded text-white"
                onClick={async (e) => {
                  const data = await axios.get('/api/metadata/comments')
                  console.log(data)
                }}
              >
                COMMENT
              </button>
            </div>

            <div>
              { comments.length ? 'heres the comments' : 'there are no comments on this story as yet' }
            </div>

            <button
              className="w-full mt-20 bg-black p-3 text-white"
              onClick={() => router.back()}
            >
              RETURN TO STORIES
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  let comments; 
  let data: any;
  try {
    comments = await axios.get(`http://localhost:3000/api/comments/`)
    console.log(comments);
  } catch (e) {
    console.log(e)
    comments = []
  }

  try {
    data = await axios.get<Post>(
      `http://localhost:3000/api/post/read/one?id=${ctx.params!.id}`
    )
  } catch (e) {
    console.log(e)
    data = [];
  }


    console.log(data!.data.post[0])
    return {
      props: {
        data: data.data.post[0],
        comments: []
      },
    }
}
