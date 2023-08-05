import {Cats} from "../../assets/images";


const NotAvailable = () => {
  return(
    <div className="flex flex-col min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 red-orange-gradient">
      <img
        className="mx-auto h-48 lg:h-60 w-auto"
        src={Cats}
        alt="laAbuelaNormaLogo"
      />
      <h1 className="text-secondary text-[40px]">404</h1>
      <h1 className="text-secondary text-[30px]">No esta disponible aun la tienda</h1>
      <h1 className="text-secondary text-[26px]">Pronto compraras tus productos que deseas</h1>
    </div>
  )
}

export default NotAvailable;
