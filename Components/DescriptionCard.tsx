import Image from "next/image";

interface Props {
    drag?: boolean;
    inf?: boolean;
    src: string;
    description: string;
    title: string;
}

export const DescriptionCard = ({ src, description, title, inf, drag }: Props) => {
  return (
    <section className="w-full h-[500px] flex justify-center items-center mt-20">
        <div className='w-10/12 flex flex-col justify-center items-center'>
            <div className={`w-52 ${ inf ? 'h-32' : drag ? 'h-40' : 'h-52'} flex relative justify-center items-center`}>
                <Image src={src} layout='fill' />
            </div>
            <div className='flex justify-center w-3/4 lg:w-2/4 items-center flex-col'>
                <h1 className='text-center font-semibold text-2xl mt-20 mb-5'>{ title }</h1>
                <p className='text-center text-gray-500'>{ description }</p>
            </div>
        </div>
    </section>
  )
}