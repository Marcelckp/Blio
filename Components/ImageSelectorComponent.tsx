import { useDropzone } from 'react-dropzone'
import { CameraIcon } from '@heroicons/react/solid'
import { useCallback } from 'react'
import Image from 'next/image'

interface Props {
  updateImage: Function
  error: boolean | null
  image: string
}

export const ImageSelectorComponent = ({
  updateImage,
  error,
  image,
}: Props) => {
  const previewFile = (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      updateImage(reader.result)
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    previewFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      {image && (
        <Image
          quality={100}
          height="600"
          width="1000"
          objectFit="contain"
          src={image}
        />
      )}
      <div
        {...getRootProps({
          onClick: (event: any) => console.log(event),
          onDrop: (event: any) => console.log(event),
          refKey: 'photo',
        })}
        className={`mt-5 flex h-32 w-full flex-col items-center justify-center rounded border-2 bg-gray-100 p-3 ${
          error && 'border-red-500 placeholder:text-red-500'
        } ${isDragActive && 'border-green-500 bg-green-200'}`}
      >
        <CameraIcon className="-z-0 h-10 w-10 text-gray-400" />
        <h1 className="-z-0 text-gray-400">
          Drop image Or Click to select a image
        </h1>
        <input {...getInputProps()} />
      </div>
    </>
  )
}
