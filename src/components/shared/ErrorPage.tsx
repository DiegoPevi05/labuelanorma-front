import {Cats} from "../../assets/images";

interface ErrorPageProps {
  code : number;
  message: string
}

const ErrorPage = (errorPageProps:ErrorPageProps) => {
  const { code, message } = errorPageProps;
  return(
    <div className="flex flex-col min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 red-orange-gradient">
      <img
        className="mx-auto h-48 lg:h-60 w-auto"
        src={Cats}
        alt="laAbuelaNormaLogo"
      />
      <h1 className="text-secondary text-[40px]">ERROR {code}</h1>
      <p className="text-secondary text-[12px]">{message}</p>
    </div>
  )
}

export default ErrorPage;
