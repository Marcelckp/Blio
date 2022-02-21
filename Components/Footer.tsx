import { GetServerSideProps } from 'next'
import { useSelector } from 'react-redux'
import Icon from '@mdi/react'
import {
  mdiTwitter,
  mdiFacebook,
  mdiInstagram,
  mdiPinterest,
  mdiYoutube,
} from '@mdi/js';

import logoBlio from '../public/assets/logoBlio.svg';
import Image from 'next/image';

export const Footer = () => {
  const user = useSelector((state:any) => state?.user?.user)

  return (
    <footer className="flex h-auto w-full items-center  justify-center bg-black text-white">
      <div className="flex  h-full w-11/12 max-w-screen-2xl flex-col items-center justify-center">
        <div className="flex flex-col w-full py-10 justify-center items-center md:items-start">
          <div className="flex flex-col items-center justify-center md:items-start">
            <Image quality={100} src={logoBlio.src} width='100px' height='100px' />
            <div className="flex w-auto space-x-4 py-12 md:hidden">
              <Icon className="h-8 w-8 cursor-pointer" path={mdiFacebook} />
              <Icon className="h-8 w-8 cursor-pointer" path={mdiYoutube} />
              <Icon className="h-8 w-8 cursor-pointer" path={mdiTwitter} />
              <Icon className="h-8 w-8 cursor-pointer" path={mdiPinterest} />
              <Icon className="h-8 w-8 cursor-pointer" path={mdiInstagram} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-4 pb-28 md:pb-0 md:flex-row md:items-start">
            <h3 className="cursor-pointer py-3 tracking-widest before:mr-2 after:ml-2 hover:before:content-['-->'] hover:after:content-['<--']">
              HOME
            </h3>
            <h3 className="cursor-pointer py-3 tracking-widest before:mr-2 after:ml-2 hover:before:content-['-->'] hover:after:content-['<--']">
              ABOUT US
            </h3>
            <h3 className="cursor-pointer py-3 tracking-widest before:mr-2 after:ml-2 hover:before:content-['-->'] hover:after:content-['<--']">
              STORIES
            </h3>
            {user ? (
              <>
                <h3 className="hover:before:content-['--> '] cursor-pointer py-3 tracking-widest before:mr-2 after:ml-2 hover:after:content-['<--']">
                  PROFILE
                </h3>
              </>
            ) : (
              <>
                <h3 className="cursor-pointer py-3 tracking-widest before:mr-2 after:ml-2 hover:before:content-['-->'] hover:after:content-['<--']">
                  SIGN IN
                </h3>
                <h3 className="cursor-pointer py-3 tracking-widest before:mr-2 after:ml-2 hover:before:content-['-->'] hover:after:content-['<--']">
                  SIGN UP
                </h3>
              </>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-center border-t-2 border-gray-500 md:justify-between md:border-0">
          <div className="hidden w-auto space-x-4 py-12 md:flex">
            <Icon className="h-8 w-8 cursor-pointer" path={mdiFacebook} />
            <Icon className="h-8 w-8 cursor-pointer" path={mdiYoutube} />
            <Icon className="h-8 w-8 cursor-pointer" path={mdiTwitter} />
            <Icon className="h-8 w-8 cursor-pointer" path={mdiPinterest} />
            <Icon className="h-8 w-8 cursor-pointer" path={mdiInstagram} />
          </div>
          <h2 className="p-8 text-gray-500">
            Copyright 2022. All Rights Reserved
          </h2>
        </div>
      </div>
    </footer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {},
    props: {},
  }
}
