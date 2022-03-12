import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/slices/userSlice'
import { ImageSelectorComponent } from './ImageSelectorComponent'

interface Props {
  closeModal: Function
}

export const PfpOverlay = ({ closeModal }: Props) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState<any>(null)
  const [error, setError] = useState<any>(false)
  const user = useSelector((state: any) => state.user.user)

  const updateImage = (data: any) => {
    setImage(data)
  }

  //   console.log(user)

  const setPfp = async () => {
    axios
      .put<any>('/api/account/pfp/set', { photo: image, id: user.user_id })
      .then((res) => {
        console.log(res)
        // dispatch(login(res.data.user))
      })
      .catch((error) => console.log(error))
  }

  return (
    <div
      id="overlay"
      onClick={(e: any) => (e.target.id ? closeModal() : '')}
      className="fixed top-0 z-[5] flex h-screen w-screen items-center justify-center bg-black bg-opacity-30"
    >
      <section className="min-h-2/4 fixed z-10 flex w-5/6 max-w-screen-md flex-col items-center justify-center rounded bg-white p-5">
        <ImageSelectorComponent
          image={image}
          updateImage={updateImage}
          error={error}
        />
        <button
          onClick={() => setPfp()}
          className="mt-5 w-full rounded bg-gradient-to-r from-[#FFC593] via-[#BC7198] to-[#5A77FF] p-3 text-xl text-white"
        >
          SUBMIT
        </button>
      </section>
    </div>
  )
}
