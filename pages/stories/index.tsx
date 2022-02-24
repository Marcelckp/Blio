import Image from 'next/image'
import { PhotoCard } from '../../Components'
import Hero from '../../public/assets/stories/desktop/moon-of-appalacia.jpg'

import behindTheWaves from '../../public/assets/stories/desktop/behind-the-waves.jpg'
import daysVoyage from '../../public/assets/stories/desktop/18-days-voyage.jpg'
import calmWaters from '../../public/assets/stories/desktop/calm-waters.jpg'
import cityScapes from '../../public/assets/stories/desktop/cityscapes.jpg'
import darkForest from '../../public/assets/stories/desktop/dark-forest.jpg'
import kingOnAfrica from '../../public/assets/stories/desktop/king-on-africa.jpg';
import landOfDreams from '../../public/assets/stories/desktop/land-of-dreams.jpg';
import milkyWay from '../../public/assets/stories/desktop/milky-way.jpg';
import mountains from '../../public/assets/stories/desktop/mountains.jpg';
import rageOfTheSea from '../../public/assets/stories/desktop/rage-of-the-sea.jpg';
import runningFree from '../../public/assets/stories/desktop/running-free.jpg';
import somwarpet from '../../public/assets/stories/desktop/somwarpet.jpg';
import tripToNo from '../../public/assets/stories/desktop/trip-to-nowhere.jpg';
import unforeseen from '../../public/assets/stories/desktop/unforeseen-corners.jpg';
import worldTour from '../../public/assets/stories/desktop/world-tour.jpg';

export default function index() {
  console.log()
  return (
    <div className="flex flex-col items-center justify-center ">
      <section className="mt-20 flex w-full max-w-screen-2xl flex-col items-center justify-center">
        <div className="relative h-[500px] w-full">
          <Image src={Hero.src}  quality={100} className="-z-10" objectFit="cover" priority layout="fill" />
          <div>
          <div className="hidden md:block absolute left-10 w-5/12 py-16">
            <h3 className="text-white tracking-widest">LAST MONTH'S FEATURED STORIES</h3>
            <br />
            <h1 className="text-3xl font-medium leading-snug tracking-widest text-white">HAZY FULL MOON OF APPALACHIA</h1>
            <br />
            <p className='text-white'>March 2nd 2020 by John Appleseed</p>
            <br />
            <p className="w-full py-8 leading-loose text-gray-500">The dissected plateau area, while not actually made up of geological mountains, is popularly called "mountains", especially in eastern Kentucky and west Virginia, and while the ridges are no high the terrain is extremely rugged</p>
          </div>
          </div>
        </div>
        <div className="bg-black flex justify-center items-center md:hidden">
          <div className="w-10/12 py-16">
            <h3 className="text-white">LAST MONTH'S FEATURED STORIES</h3>
            <br />
            <h1 className="text-3xl font-medium leading-snug tracking-widest text-white">HAZY FULL MOON OF APPALACHIA</h1>
            <br />
            <p className='text-white'>March 2nd 2020 by John Appleseed</p>
            <br />
            <p className="w-full py-8 leading-loose text-gray-500">The dissected plateau area, while not actually made up of geological mountains, is popularly called "mountains", especially in eastern Kentucky and west Virdinia, and while the ridges are no high the terrain is extremely rugged</p>
          </div>
        </div>
        <div className="relative w-full md:grid md:grid-cols-2  xl:grid-cols-4">
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={behindTheWaves.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={'https://iili.io/1oHFM7.jpg'}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={calmWaters.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={cityScapes.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={darkForest.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={kingOnAfrica.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={landOfDreams.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={milkyWay.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={mountains.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={rageOfTheSea.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={runningFree.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={somwarpet.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={tripToNo.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={unforeseen.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
          <PhotoCard
            creator={'Marcel Palmer'}
            postId={2}
            src={worldTour.src}
            title={'This is summer'}
            createdAt={Date.now()}
          />
        </div>
      </section>
    </div>
  )
}
