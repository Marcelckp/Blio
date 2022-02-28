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
  const [errorBody, setErrorBody] = useState<null | boolean>(null)
  const [errorTitle, setErrorTitle] = useState<null | boolean>(null)
  const [errorPhoto, setErrorPhoto] = useState<null | boolean>(null)
  const [post, setPost] = useState<null | object>(null)
  const [loading, setLoading] = useState(false)

  const Title = useRef<any>(null)
  const Body = useRef<any>(null)
  const [Photo, setPhoto] = useState(null)

  useEffect(() => {
    if (!Cookie.get('user')) window.location.replace('/')
    if (Cookie.get('post')) setPost(JSON.parse(Cookie.get('post') || ''))
  },[setPost])

  const createPost = async () => {
    // console.log(Title, Photo, Body);
    if (Body.current.value && Photo && Title.current.value) {
      setLoading(true)
      setError(false)
      let data

      data = await axios
        .post('/api/post/create', {
          photo: Photo,
          body: Body.current.value,
          title: Title.current.value,
        })
        .then((res) => {
          console.log(res)
          setLoading(false)
          setPost(res.data.post)
          Cookie.set('post', JSON.stringify(res.data.post))
        })
        .catch(({ response }) => {
          console.log(response)
          setLoading(false)
          setError(response.data.message || response.data.errorMsg)
          setErrorBody(true)
          setErrorTitle(true)
          setErrorPhoto(true)
        })
        
    } else {
      setError('Please make sure all provided fields are filled')
      setErrorTitle(true)
      setErrorPhoto(true)
      setErrorBody(true)
    }
  }

  console.log(post)

  return (
    <section className="h-screen min-h-[800px] w-full">
      <section className=" flex h-full items-center justify-center">
        {post ? 
          <div>
            <h1>heres the post</h1>
          </div>
        :
        <div className=" flex w-full max-w-screen-md flex-col items-center justify-center md:flex-row md:space-x-8">
          {loading ? (
            <LoadingDots text={'Creating Post'} />
          ) : (
            <div className="flex flex-col">
              <h1 className="w-full whitespace-nowrap text-center text-4xl md:w-1/3">
                Create a new post
              </h1>
              <br />
              <p className="text-left text-base text-gray-500">
                * To make text bold wrap it with {'<'}b{'>'}
              </p>
              <p className="text-left text-base text-gray-500">
                * To make text italicized wrap it with {'<'}i{'>'}
              </p>
              <p className="text-left text-base text-gray-500">
                * To make a title use {'<'}t{'>'}
              </p>
              <p className="text-left text-base text-gray-500">
                * To make subheadings use {'<'}h{'>'}
              </p>
            </div>
          )}
          <div className="h-full flex-grow-0 p-5 md:w-2/3">
            {loading ? (
              <Loader />
            ) : (
              <>
                {error && <h1 className="text-red-500">* {error}</h1>}
                <input
                  onChange={() => setErrorTitle(false)}
                  ref={Title}
                  placeholder="Enter the title of your post..."
                  className={`mt-5 w-full rounded border-2 bg-gray-100 p-3 ${
                    errorTitle && 'border-red-500 placeholder:text-red-500'
                  }`}
                  type="text"
                />
                <input
                  type="file"
                  onChange={(e:any) => { 
                    console.log(e.target.files[0].name, e.target.files[0]);
                    setPhoto(e.target.files[0].name)
                    setErrorPhoto(false)
                  }}
                  placeholder="Select the photo you want to share..."
                  className={`mt-5 w-full rounded border-2 bg-gray-100 p-3 ${
                    errorPhoto && 'border-red-500 placeholder:text-red-500'
                  }`}
                />
                <textarea
                  onChange={() => setErrorBody(false)}
                  ref={Body}
                  placeholder="Tell us about your photo..."
                  className={`mt-5 w-full rounded border-2 bg-gray-100 p-3 ${
                    errorBody && 'border-red-500 placeholder:text-red-500'
                  }`}
                />
                <button
                  onClick={createPost}
                  className="mt-5 w-full rounded bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF] p-3 text-white"
                >
                  CREATE POST
                </button>
              </>
            )}
          </div>
        </div> }
      </section>
    </section>
  )
}
