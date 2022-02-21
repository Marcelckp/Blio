import { useLottie } from 'lottie-react'
import LoaderAni from '../public/assets/lottie.json'

export const Loader = () => {
  const options = {
    animationData: LoaderAni,
    loop: true,
    autoplay: true,
  }
  const { View } = useLottie(options);

  return View;
}
