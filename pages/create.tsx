import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Loader, LoadingDots, ImageSelectorComponent } from '../Components'
import Cookie from 'js-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/userSlice'
import { Post } from '../Types'

// import { GetServerSideProps } from 'next'

export default function signin() {
  const router = useRouter()

  const [error, setError] = useState<any>(false)
  const [errorBody, setErrorBody] = useState<null | boolean>(null)
  const [errorTitle, setErrorTitle] = useState<null | boolean>(null)
  const [errorPhoto, setErrorPhoto] = useState<null | boolean>(null)
  const [image, setImage] = useState<any>(null)
  const [post, setPost] = useState<null | Post>(null)
  const [loading, setLoading] = useState(false)

  const Title = useRef<any>(null)
  const Body = useRef<any>(null)

  useEffect(() => {
    if (!Cookie.get('user')) window.location.replace('/')
    if (Cookie.get('post')) setPost(JSON.parse(Cookie.get('post') || ''))
  }, [Cookie])

  const updateImage = (data: any) => {
    setImage(data)
  }

  const createPost = async () => {
    // console.log(Title, Photo, Body);
    if (Body.current.value && image && Title.current.value) {
      setLoading(true)
      setError(false)

      let data

      data = await axios
        .post('/api/post/create', {
          photo: image,
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
          setError(
            response.data.message || response.data.errorMsg || response.data
          )
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

  const deletePost = async () => {
    setLoading(true)
    const data = await axios
      .delete('/api/post/delete/recent')
      .then((response) => {
        Cookie.remove('post')
        setPost(null)
        setImage(null)
        setLoading(false)
      })
      .catch(({ response }) => console.log(response))
  }

  console.log(post)
  console.log(image?.length)

  return (
    <section className="h-screen min-h-[800px] w-full">
      <section className=" flex h-full items-center justify-center">
        {post && loading ? (
          <div className="flex w-full flex-col items-center justify-center">
              <LoadingDots text="Deleting Post" />
              <Loader />
          </div>
        ) : post && !loading ? (
          <div className="flex w-full max-w-screen-md flex-col items-center justify-center">
            <h1 className="mb-5 text-3xl">Here is your post</h1>
            <img src={post!.photo} alt="" />
            <div className="block w-full p-5 text-left">
              <h1 className="mb-3 text-2xl font-semibold">{post.title}</h1>
              <p className="mb-10">{post.body}</p>
              <h1 className="text-lg font-semibold">
                Are you happy with your post?
              </h1>
            </div>
            <div className="flex w-full space-x-5 px-5">
              <button onClick={() => {
                Cookie.remove('post')
                router.push('/stories')
              }} className="w-full rounded bg-black p-3 text-xl text-white">
                Valid
              </button>
              <button
                onClick={deletePost}
                className="w-full rounded bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF] p-3 text-xl text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
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
                    className={`mt-5 mb-5 w-full rounded border-2 bg-gray-100 p-3 ${
                      errorTitle && 'border-red-500 placeholder:text-red-500'
                    }`}
                    type="text"
                  />
                  <ImageSelectorComponent
                    image={image}
                    error={errorPhoto}
                    updateImage={updateImage}
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
                    className="mt-5 w-full rounded bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF] p-3 text-xl text-white"
                  >
                    CREATE POST
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </section>
  )
}
