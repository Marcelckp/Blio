import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import biloDark from '../public/assets/logoBlioBlack.svg'
import Image from 'next/image'

export const Nav = () => {
  const user = useSelector((state: any) => state.user.user)

  const router = useRouter()

  const [active, setActive] = useState(false)

  const deactivate = () => {
    setActive(false)
  }

  return (
    <>
      <nav className="fixed top-0 z-20 flex h-20 w-full items-center justify-center bg-white drop-shadow-lg">
        <div className="  flex h-full w-11/12 max-w-screen-2xl items-center justify-between">
          <div>
            <Image
              quality={100}
              src={biloDark.src}
              width="100px"
              height="100px"
            />
          </div>
          <div>
            <div
              className="md:hidden"
              onClick={() => (active ? setActive(false) : setActive(true))}
            >
              <svg
                className="cursor-pointer"
                width="28"
                height="14"
                viewBox="0 0 28 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="">
                  <rect
                    x="4"
                    width="20"
                    height="1"
                    fill="black"
                    className={`${active ? 'openRight' : 'closeRight'}`}
                  />
                  <rect
                    x="4"
                    y="5"
                    width="20"
                    height="1"
                    fill="black"
                    className={`${active ? 'openLeft' : 'closeLeft'}`}
                  />
                </g>
              </svg>
            </div>
            <div className="hidden items-center space-x-5 md:flex">
              <div
                className="cursor-pointer font-medium tracking-widest"
                onClick={() => {
                  router.push('/')
                  setActive(false)
                }}
              >
                <h1>HOME</h1>
              </div>
              <div
                className="cursor-pointer font-medium tracking-widest"
                onClick={() => {
                  router.push('/stories')
                  setActive(false)
                }}
              >
                <h1>STORIES</h1>
              </div>
              <div
                className="cursor-pointer font-medium tracking-widest"
                onClick={() => {
                  router.push('/about')
                  setActive(false)
                }}
              >
                <h1>ABOUT</h1>
              </div>
              {user ? (
                <>
                  <div
                    className="cursor-pointer bg-black px-3 py-2 font-medium tracking-widest text-white transition-all duration-300 ease-in-out hover:bg-opacity-40"
                    onClick={() => {
                      router.push('/profile')
                      setActive(false)
                    }}
                  >
                    <h1>PROFILE</h1>
                  </div>
                  <div
                    className="cursor-pointer bg-black px-3 py-2 font-medium tracking-widest text-white transition-all duration-300 ease-in-out hover:bg-opacity-40"
                    onClick={() => {
                      router.push('/create')
                      setActive(false)
                    }}
                  >
                    <h1>CREATE POST</h1>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="cursor-pointer bg-black px-3 py-2 font-medium tracking-widest text-white transition-all duration-300 ease-in-out hover:bg-opacity-40 "
                    onClick={() => {
                      router.push('/signup')
                      setActive(false)
                    }}
                  >
                    <h1>SIGN UP</h1>
                  </div>
                  <div
                    className="cursor-pointer bg-black px-3 py-2 font-medium tracking-widest text-white transition duration-300 ease-in-out hover:bg-opacity-40"
                    onClick={() => {
                      router.push('/signin')
                      setActive(false)
                    }}
                  >
                    <h1>SIGN IN</h1>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <DropDown deactivate={deactivate} active={active} user={user} />
    </>
  )
}

interface DropDownProps {
  active: boolean
  user: any
  deactivate: Function
}

const DropDown = ({ active, user, deactivate }: DropDownProps) => {
  const router = useRouter()

  return (
    <>
      {active && (
        <div
          className="fixed top-0 z-10 h-screen w-screen bg-[#00000098]"
          onClick={() => deactivate()}
        />
      )}
      <div
        className={`fixed top-20 z-20 flex w-full flex-col items-center justify-center overflow-hidden bg-white transition-all duration-500 ease-in-out md:hidden ${
          active ? ' h-64 py-5' : 'h-0'
        }`}
      >
        <div className="flex w-10/12 cursor-pointer flex-col items-center justify-center">
          <div
            className="p-2 font-medium tracking-widest"
            onClick={() => {
              router.push('/')
              deactivate()
            }}
          >
            <h1>HOME</h1>
          </div>
          <div
            className=" flex w-full cursor-pointer items-center justify-center p-2 font-medium tracking-widest"
            onClick={() => {
              router.push('/stories')
              deactivate()
            }}
          >
            <h1>STORIES</h1>
          </div>
          <div
            className="mb-2 flex w-full cursor-pointer items-center justify-center border-b-2 p-2 font-medium tracking-widest"
            onClick={() => {
              router.push('/about')
              deactivate()
            }}
          >
            <h1>ABOUT</h1>
          </div>
          {user ? (
            <>
              <div
                className="mb-2 mt-2 flex w-full cursor-pointer items-center justify-center bg-black p-2 font-medium tracking-widest text-white transition duration-300 ease-in-out hover:bg-opacity-40"
                onClick={() => {
                  router.push('/profile')
                  deactivate()
                }}
              >
                <h1>PROFILE</h1>
              </div>
              <div
                className="mb-2 mt-2 flex w-full cursor-pointer items-center justify-center bg-black p-2 font-medium tracking-widest text-white transition duration-300 ease-in-out hover:bg-opacity-40"
                onClick={() => {
                  router.push('/create')
                  deactivate()
                }}
              >
                <h1>CREATE POST</h1>
              </div>
            </>
          ) : (
            <>
              <div
                className="mb-2 mt-2 flex w-full cursor-pointer items-center justify-center bg-black p-2 font-medium tracking-widest text-white transition duration-300 ease-in-out hover:bg-opacity-40"
                onClick={() => {
                  router.push('/signup')
                  deactivate()
                }}
              >
                <h1>SIGN UP</h1>
              </div>
              <div
                className="mb-2 flex w-full cursor-pointer items-center justify-center bg-black p-2 font-medium tracking-widest text-white transition duration-300 ease-in-out hover:bg-opacity-40"
                onClick={() => {
                  router.push('signin')
                  deactivate()
                }}
              >
                <h1>SIGN IN</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
