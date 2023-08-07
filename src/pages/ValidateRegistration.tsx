import {useState,useEffect} from "react";
import {Logo} from "../assets/images";
import {toast} from "react-hot-toast";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoadingComponent from '../components/shared/LoadingComponent';


const ValidateRegistration = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');


  const validateCode = async () => {
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/validate-account",null,{params: {token}});
      setIsLoading(false);
    }catch (error) {
        toast.error("Hubo un problema, recarga la pagina o consulta al administrador.");
    }
  };

  useEffect(()=>{
    validateCode();
  },[])



  if(isLoading){
    return(
      <LoadingComponent isLoading={isLoading} />
    )
  }else{

    return(
      <>
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 red-orange-gradient">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <a href="/" className="h-full w-full">
                    <img
                      className="mx-auto h-48 w-auto"
                      src={Logo}
                      alt="laAbuelaNormaLogo"
                    />
                  </a>
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-secondary">
                    Felicidades tu cuenta ha sido activada exitosamente!
                  </h2>
                  <div className="w-full h-auto flex justify-center py-4">
                    <a href="/#/sign-in" className="text-center text-primary hover:text-secondary cursor-pointer text-[24px]">Iniciar Sesión</a>
                  </div>
                </div>
              </div>
            </div>
      </>
    )
  }


}

export default ValidateRegistration;
