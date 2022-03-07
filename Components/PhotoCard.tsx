import Image from 'next/image';
import React from 'react';
import { whiteArrow } from '../public/assets/shared/desktop/arrow';
import mnt from 'moment'

interface Props {
    creator: string;
    postId: number | string;
    createdAt: number | string;
    title: string;
    src: string
}

export const PhotoCard = ({creator, postId, title, createdAt, src}: Props) => {

    const time = mnt(+createdAt.toString().replaceAll(',', ''))
    // console.log(time);
  return (
      <div className={`cursor-pointer hover:-translate-y-10 transition-all duration-300 ease-in-out relative w-full  flex items-center justify-center h-[600px] bg-no-repeat bg-cover object-fill`}>
          <Image quality={100} className='-z-10' src={src} layout='fill' objectFit='cover' />
          <div className='w-full h-full flex justify-center items-end bg-gradient-to-b from-[#fff0] to-[#00000080]'>
            <div className='w-10/12 py-5 text-white'>
                <div className=' border-b-[1px] border-gray-500 py-5'>
                    <p className='text-sm py-1'>{ time.format('DD MMM YYYY') }</p>
                    <h1 className='font-semibold text-2xl'>{ title}</h1>
                    <p className='text-sm py-1'>by { creator.slice(0,1).toUpperCase() + creator.slice(1) }</p>
                </div>
                <div className='w-full flex justify-between items-center py-4' onClick={() => {}}>
                    <h2 className='tracking-widest text-base'>READ STORY</h2>
                    { whiteArrow }
                </div>
            </div>
          </div>
      </div>
  );
};