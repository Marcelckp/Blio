import Head from 'next/head'
import { useSelector } from 'react-redux'
import { PhotoCard } from '../Components/'
import { whiteArrow, blackArrow } from '../public/assets/shared/desktop/arrow'

import createShareD from '../public/assets/home/desktop/create-and-share.jpg'
import designed from '../public/assets/home/desktop/designed-for-everyone.jpg'
import beautiful from '../public/assets/home/desktop/beautiful-stories.jpg'
import Image from 'next/image'
import { useEffect } from 'react'

import Img1 from '../public/assets/stories/desktop/calm-waters.jpg'
import Img2 from '../public/assets/stories/desktop/architecturals.jpg'
import Img3 from '../public/assets/stories/desktop/behind-the-waves.jpg'
import Img4 from '../public/assets/stories/desktop/dark-forest.jpg'
import { useRouter } from 'next/router'

export default function Home() {
  const user = useSelector((state: any) => state?.user?.user)
  const router = useRouter()
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-screen-2xl flex-col items-center justify-center">
        <Head>
          <title>Blio</title>
        </Head>
        <section className="mt-20 w-full md:flex md:h-[700px] md:flex-row-reverse">
          <div className="relative h-[400px] w-full md:h-full md:w-2/4 xl:w-4/5">
            <Image
              src={createShareD}
              priority
              objectFit="cover"
              objectPosition="center center"
              layout="fill"
              quality={100}
            />
          </div>

          <div className="flex w-full items-center justify-center bg-black py-16 xl:w-3/5">
            <div className="w-10/12">
              <h1 className="text-3xl font-medium leading-snug tracking-widest text-white">
                CREATE AND SHARE YOUR PHOTO STORIES.
              </h1>

              <p className="py-8 leading-loose text-gray-500">
                Photosnap is a platform for photographers and visual
                storytellers. We make it wast to share photos, tell stories and
                connect with others.
              </p>

              <div className="flex w-full items-center space-x-6 text-white cursor-pointer" onClick={() => user ? '' : router.push('/login')}>
                <h1 className="font-medium tracking-widest">GET STARTED </h1>
                {/* <img src={white.src} className="h-4" alt="" />
                 */}
                {whiteArrow}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full text-black md:flex md:h-[700px]">
          <div className="relative h-[400px] w-full md:h-full md:w-2/4 xl:w-4/5">
            <Image
              src={beautiful}
              objectFit="cover"
              layout="fill"
              quality={100}
            />
          </div>

          <div className="flex w-full items-center justify-center py-16 xl:w-3/5">
            <div className="w-10/12">
              <h1 className="text-3xl font-medium leading-snug tracking-widest">
                BEAUTIFUL STORIES EVERY TIME
              </h1>

              <p className="w-full py-8 leading-loose">
                We provide ways for you to easily add photos, text and any other
                content from other networks to compliment your story, So that
                you can search it with everyone.
              </p>

              <div className="flex w-full items-center space-x-6 cursor-pointer"  onClick={() => router.push('/stories')}>
                <h1 className="font-medium tracking-widest">VIEW STORIES</h1>
                {/* <img src={whiteArrow} className="h-4" alt="" /> */}
                {blackArrow}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full text-black md:flex md:h-[700px] md:flex-row-reverse ">
          <div className="relative h-[400px] w-full md:h-full md:w-2/4 xl:w-4/5">
            <Image
              src={designed}
              objectFit="cover"
              layout="fill"
              quality={100}
            />
          </div>

          <div className="flex w-full items-center justify-center py-16 xl:w-3/5">
            <div className="w-10/12">
              <h1 className="text-3xl font-medium leading-snug tracking-widest">
                BEAUTIFUL STORIES EVERY TIME
              </h1>

              <p className="w-full py-8 leading-loose">
                Blio can help you create stories that resonate with people and
                engage them in what you are about as a personal blog. Our tool
                is designed for photographers of all levels, brands, businesses
                but is not exclusive to them view some of the stories and decide
                if you want to join our community.
              </p>

              <div className="flex w-full items-center space-x-6 cursor-pointer" onClick={() => router.push('/stories')}>
                <h1 className="font-medium tracking-widest">VIEW STORIES</h1>
                {/* <img src={whiteArrow} className="h-4" alt="" /> */}
                {blackArrow}
              </div>
            </div>
          </div>
        </section>

        <section className="h-auto w-full md:grid md:grid-cols-2 xl:h-[600px] xl:grid-cols-4">
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={Img1.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={Img2.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={Img3.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={Img4.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
        </section>
      </div>
    </div>
  )
}
