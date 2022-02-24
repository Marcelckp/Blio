import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Loader, LoadingDots } from '../Components'
import Cookie from 'js-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/userSlice'
// import { GetServerSideProps } from 'next'

export default function signin() {
  const router = useRouter()

  const dispatch = useDispatch()

  const [error, setError] = useState<any>(false)
  const [errorAcc, setErrorAcc] = useState<null | boolean>(null)
  const [errorPassword, setErrorPassword] = useState<null | boolean>(null)
  const [loading, setLoading] = useState(false)

  const Account = useRef<any>(null)
  const Password = useRef<any>(null)

  useEffect(() => {
    if (Cookie.get('user')) window.location.replace('/')
  })

  const signIn = async () => {
    if (Account.current.value && Password.current.value) {
      setLoading(true)
      setError(false)
      let data
      if (/@\w+[\.]\w/.test(Account!.current!.value)) {
        data = await axios
          .post('/api/account/read', {
            email: Account.current.value,
            password: Password.current.value,
          })
          .then((res) => {
            console.log(res)
            setLoading(false)
            dispatch(login(res.data.account))
          })
          .catch(({ response }) => {
            console.log(response.data)
            setLoading(false)
            setError(response.data.errorMsg)
            setErrorAcc(true)
            setErrorPassword(true)
            Account.current.value = ''
            Password.current.value = ''
          })
      } else {
        data = await axios
          .post('/api/account/read', {
            username: Account.current.value,
            password: Password.current.value,
          })
          .then((res) => {
            console.log(res)
            setLoading(false)
            dispatch(login(res.data.account))
            history.back()
          })
          .catch(({ response }) => {
            console.log(response.data)
            setLoading(false)
            setError(response.data.errorMsg)
            setErrorAcc(true)
            setErrorPassword(true)
            Account.current.value = ''
            Password.current.value = ''
          })
      }
    } else {
      setError('Please provide a username & password to sign in')
      setErrorAcc(true)
      setErrorPassword(true)
    }
  }

  return (
    <section className="h-screen min-h-[800px] w-full">
      <section className=" flex h-full items-center justify-center">
        <div className=" flex w-full max-w-screen-md flex-col items-center justify-center md:flex-row">
          {loading ? (
            <LoadingDots text={'Signing In'} />
          ) : (
            <h1 className="w-full text-center text-4xl md:w-1/3">Sign In</h1>
          )}
          <div className="h-full flex-grow p-5">
            {loading ? (
              <Loader />
            ) : (
              <>
                {error && <h1 className="text-red-500">* {error}</h1>}
                <input
                  onChange={() => setErrorAcc(false)}
                  ref={Account}
                  placeholder="Enter your username or email..."
                  className={`mt-5 w-full rounded border-2 bg-gray-100 p-3 ${
                    errorAcc && 'border-red-500 placeholder:text-red-500'
                  }`}
                  type="text"
                />
                <input
                  onChange={() => setErrorPassword(false)}
                  ref={Password}
                  placeholder="Enter your password..."
                  className={`mt-5 w-full rounded border-2 bg-gray-100 p-3 ${
                    errorPassword && 'border-red-500 placeholder:text-red-500'
                  }`}
                  type="text"
                />

                <button
                  onClick={signIn}
                  className="mt-5 w-full rounded bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF] p-3 text-white"
                >
                  Sign In
                </button>
                <p className="mt-5 text-center">
                  You don't have an account ?{' '}
                  <span
                    className="cursor-pointer text-[#5A77FF]"
                    onClick={() => router.push('/signup')}
                  >
                    Click here to create a account
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

// export const getServerSideProps = async () => {
//   console.log(Cookie.get('user'))
//   if (Cookie.get('user')) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/',
//       },
//       props: {},
//     }
//   } else {
//     return {
//       props: {},
//     }
//   }
// }
