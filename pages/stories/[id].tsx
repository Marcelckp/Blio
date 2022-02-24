import Image from 'next/image'
import hero from '../../public/assets/stories/desktop/rage-of-the-sea.jpg'

export default function specificStory() {
  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center">
      <div className="flex h-screen  w-full max-w-screen-2xl flex-col items-center justify-center">
        <section className="min-h-screen w-full  flex flex-col md:flex-row">
          <div className=' relative h-[400px] w-full md:h-full md:w-80 lg:w-[700px]'>
            <Image
              src={hero.src}
              layout='fill'
              objectFit="cover"
              quality={100}
            />
          </div>
          <div className='p-10 flex-grow flex flex-col items-center w-full overflow-y-scroll'>
            <h1 className='text-4xl mb-10'>Title OF POST</h1>
            <h1 className='text-4xl mb-10'>Creator</h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              praesentium ad, illum nisi minima, recusandae dolores voluptas
              quod accusantium vel odit ut debitis repudiandae dolorem error
              enim quis consequatur? Eius!
            </h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              praesentium ad, illum nisi minima, recusandae dolores voluptas
              quod accusantium vel odit ut debitis repudiandae dolorem error
              enim quis consequatur? Eius!
            </h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              praesentium ad, illum nisi minima, recusandae dolores voluptas
              quod accusantium vel odit ut debitis repudiandae dolorem error
              enim quis consequatur? Eius!
            </h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              praesentium ad, illum nisi minima, recusandae dolores voluptas
              quod accusantium vel odit ut debitis repudiandae dolorem error
              enim quis consequatur? Eius!
            </h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              praesentium ad, illum nisi minima, recusandae dolores voluptas
              quod accusantium vel odit ut debitis repudiandae dolorem error
              enim quis consequatur? Eius!
            </h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              praesentium ad, illum nisi minima, recusandae dolores voluptas
              quod accusantium vel odit ut debitis repudiandae dolorem error
              enim quis consequatur? Eius!
            </h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              praesentium ad, illum nisi minima, recusandae dolores voluptas
              quod accusantium vel odit ut debitis repudiandae dolorem error
              enim quis consequatur? Eius!
            </h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              praesentium ad, illum nisi minima, recusandae dolores voluptas
              quod accusantium vel odit ut debitis repudiandae dolorem error
              enim quis consequatur? Eius!
            </h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              praesentium ad, illum nisi minima, recusandae dolores voluptas
              quod accusantium vel odit ut debitis repudiandae dolorem error
              enim quis consequatur? Eius!
            </h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              praesentium ad, illum nisi minima, recusandae dolores voluptas
              quod accusantium vel odit ut debitis repudiandae dolorem error
              enim quis consequatur? Eius!
            </h1>
          </div>
        </section>
      </div>
    </div>
  )
}
