import Image from 'next/image'
import { whiteArrow, blackArrow } from '../public/assets/shared/desktop/arrow'
import Hero from '../public/assets/pricing/desktop/hero.jpg'
import { DescriptionCard } from '../Components/'

import ResponsiveSvg from '../public/assets/features/desktop/responsive.svg'
import noLimit from '../public/assets/features/desktop/no-limit.svg'
import BoostExposure from '../public/assets/features/desktop/boost-exposure.svg'
import Drag from '../public/assets/features/desktop/drag-drop.svg'
import backDrop from '../public/assets/shared/desktop/bg-beta.jpg'
import { mdiNavigationOutline } from '@mdi/js'
import { useRouter } from 'next/router'

export default function about() {
    const router = useRouter()
    return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-screen-2xl flex-col items-center justify-center">
        <section className="mt-20 w-full md:flex md:h-[700px] md:flex-row-reverse">
          <div className="relative h-[400px] w-full md:h-full md:w-2/4 xl:w-4/5">
            <Image
              src={Hero}
              priority
              objectFit="cover"
              objectPosition="center center"
              layout="fill"
              quality={100}
            />
          </div>

          <div className="flex w-full items-center justify-center bg-black py-16 xl:w-3/5">
            <div className="w-10/12">
              <h1 className="text-3xl font-medium leading-snug tracking-widest text-white">
                FEATURES
              </h1>

              <p className="py-8 leading-loose text-gray-500">
                We make sure all of our features are designed to be loved by
                every aspiring and even professional photographers who wanted to
                share their stories.
              </p>

              <div className="flex w-full items-center space-x-6 text-white">
                <h1 className="font-medium tracking-widest" onClick={() => router.push('signup')}>GET STARTED </h1>
                {/* <img src={white.src} className="h-4" alt="" />
                 */}
                {whiteArrow}
              </div>
            </div>
          </div>
        </section>

        <div className='w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
          <DescriptionCard
            src={ResponsiveSvg.src}
            description={
              "No matter the device you're on, our site is fully responsive and stories look beautiful on any screen."
            }
            title={'100% Responsive'}
          />
          <DescriptionCard
            src={noLimit.src}
            inf={true}
            description={
              'Our tool has no limits on uploads or bandwidth. Freely upload in bulk and share all of your stories in one go.'
            }
            title={'No Photo Upload Limit'}
          />
          <DescriptionCard
            src={BoostExposure.src}
            description={
              'Users that viewed your story or gallery can easily connect with more of your content with our built in stories showcase channel.'
            }
            title={'Boost Your Exposure'}
          />
          <DescriptionCard
            src={Drag.src}
            drag={true}
            description={
              'Easily drag and drop your images to easily create beautiful stories every time. No over the top tooling to add friction to creating stories.'
            }
            title={'Drag & Drop Images'}
          />
        </div>
        <br />
        <br />
        <section className="relative flex w-full items-center justify-center py-20">
          <Image
            src={backDrop.src}
            className="-z-10"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <section className="flex w-10/12 items-center justify-center">
            <div className="flex w-full flex-col justify-between text-white md:flex-row">
              <h1 className="text-3xl font-medium leading-snug tracking-widest md:w-2/4">
                WE'RE IN BETA. JOIN US TO MAKE AN IMPACT IN THE PHOTOGRAPHY
                WORLD TODAY!
              </h1>
              <br />
              <div className="flex items-center">
                <div className="flex w-full items-center space-x-6 text-white md:whitespace-nowrap">
                  <h1 className="font-medium tracking-widest">JOIN US</h1>
                  {whiteArrow}
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}
