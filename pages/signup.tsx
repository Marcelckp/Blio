import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { Loader, LoadingDots } from '../Components'

export default function signup() {
  const router = useRouter()

  const [error, setError] = useState<any>(false)
  const [errorAcc, setErrorAcc] = useState<null | boolean>(null)
  const [errorPassword, setErrorPassword] = useState<null | boolean>(null)
  const [errorEmail, setErrorEmail] = useState<null | boolean>(null)
  const [errorUsername, setErrorUsername] = useState<null | boolean>(null)
  const [errorConfirm, setErrorConfirm] = useState<null | boolean>(null)

  const [loading, setLoading] = useState(false)

  const Fullname = useRef<any>(null)
  const Email = useRef<any>(null)
  const Password = useRef<any>(null)
  const Username = useRef<any>(null)
  const ConfirmPassword = useRef<any>(null)

  useEffect(() => {
    if (Cookies.get('user')) window.location.replace('/')
  })


  const signUp = async () => {
    if (
      Password.current.value &&
      ConfirmPassword.current.value &&
      Username.current.value &&
      Email.current.value &&
      Fullname.current.value
    ) {
      if (
        Password.current.value === ConfirmPassword.current.value &&
        Password.current.value
      ) {
        setLoading(true)
        setError(false)

        try {
          const user = await axios
            .post('/api/account/create', {
              fullname: Fullname.current!.value,
              email: Email.current!.value,
              password: Password.current!.value,
              username: Username.current!.value,
            })
            .then((_) => setLoading(false))

          console.log(user)
        } catch ({ response }) {
          console.log(response)
          setLoading(false)
          setError(response.data.errorMsg)
          setErrorAcc(true)
          setErrorPassword(true)
          setErrorEmail(true)
          setErrorUsername(true)
          setErrorConfirm(true)
          Fullname.current.value = ''
          Email.current.value = ''
          Username.current.value = ''
          Password.current.value = ''
          ConfirmPassword.current.value = ''
        }
      } else {
        setError('The passwords you entered do not match')
        setErrorConfirm(true)
      }
    } else {
      setError(`Please fill out all the fields below`)
      setLoading(false)
      setErrorAcc(true)
      setErrorPassword(true)
      setErrorEmail(true)
      setErrorUsername(true)
      setErrorConfirm(true)
    }
  }

  return (
    <section className=" flex h-screen min-h-[800px] w-full items-center justify-center">
      <section className="flex h-full min-h-[1000px] items-center justify-center">
        <div className=" flex w-full max-w-screen-md flex-col items-center justify-center space-x-5 md:flex-row">
          {loading ? (
            <LoadingDots text={'Creating Account'} />
          ) : (
            <div className="flex w-80 flex-col items-center justify-center md:w-1/3">
              <h1 className="mb-5 w-full text-center text-4xl">
                Create A New Account
              </h1>
              <p className="text-gray-500">* All fields are required</p>
            </div>
          )}
          <div className="flex h-full flex-grow flex-col p-5">
            {loading ? (
              <Loader />
            ) : (
              <>
                {error && <h1 className="text-red-500">* {error}</h1>}
                <input
                  ref={Fullname}
                  onChange={() => setErrorAcc(false)}
                  placeholder="Enter your name..."
                  className={`mt-5 w-full rounded border-2 bg-gray-100 p-3 ${
                    errorAcc && 'border-red-500 placeholder:text-red-500'
                  }`}
                  type="text"
                />
                <input
                  ref={Username}
                  onChange={() => setErrorUsername(false)}
                  placeholder="Enter your username..."
                  className={`mt-5 w-full rounded border-2 bg-gray-100 p-3 ${
                    errorUsername && 'border-red-500 placeholder:text-red-500'
                  }`}
                  type="text"
                />
                <input
                  ref={Email}
                  onChange={() => setErrorEmail(false)}
                  placeholder="Enter your email..."
                  className={`mt-5 w-full rounded border-2 bg-gray-100 p-3 ${
                    errorEmail && 'border-red-500 placeholder:text-red-500'
                  }`}
                  type="text"
                />
                <input
                  ref={Password}
                  onChange={() => setErrorPassword(false)}
                  placeholder="Enter your password..."
                  className={`mt-5 w-full rounded border-2 bg-gray-100 p-3 ${
                    errorPassword && 'border-red-500 placeholder:text-red-500'
                  }`}
                  type="text"
                />
                <input
                  ref={ConfirmPassword}
                  onChange={() => setErrorConfirm(false)}
                  placeholder="Confirm your password..."
                  className={`mt-5 w-full rounded border-2 bg-gray-100 p-3 ${
                    errorConfirm && 'border-red-500 placeholder:text-red-500'
                  }`}
                  type="text"
                />
                <button
                  onClick={signUp}
                  className="mt-5 w-full rounded bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF] p-3 text-white"
                >
                  Sign Up
                </button>
                <p className="mt-5 text-center">
                  Have an account already ?{' '}
                  <span
                    className="cursor-pointer text-[#5A77FF]"
                    onClick={() => router.push('/signin')}
                  >
                    Click here to sign in
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}
