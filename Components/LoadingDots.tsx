interface Props {
  text: string
}

export const LoadingDots = ({ text }: Props) => {
  return (
    <div className="flex h-0 items-center space-x-16">
      <h1 className="whitespace-nowrap text-4xl">{text}</h1>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
