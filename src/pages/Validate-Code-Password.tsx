import {useState,ChangeEvent} from "react";
import {Logo} from "../assets/images";
import {CheckCircle} from 'lucide-react'
import {toast} from "react-hot-toast";
import axios from "axios";
import Button from '../components/ui/Button';
import { useNavigate } from "react-router-dom";


const ValidatePassword = () => {

  const navigate = useNavigate();
  const [recoverCode, setRecoverCode] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.target;
    setRecoverCode(value);
  };

  const handleSubmit = async () => {
    const email = localStorage.getItem("email");
    if(email == null){
      toast.error("Email no encontrado vuelve a solicitar codigo de Recuperación");
      return;
    }

    setIsLoading(true);
    try {
      const body = { email, recover_token: recoverCode };
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/validate-token", body);
      toast.success("Codigo Valido");
      localStorage.setItem("recoverCode",recoverCode);
      setTimeout(() => navigate("/reset-password"),2000);
    }catch (error) {
      console.log(error)
      if (typeof error !== 'undefined' && error instanceof Error) {
        const errorResponse = error as { response?: { status: number } };
        if(errorResponse.response){
          if(errorResponse.response.status == 403){
            toast.error("El correo proporcionado no tiene una cuenta asociada.");
          }else{
            toast.error("Error interno en el servidor.");
          }
        }else{
          toast.error("Error interno en el servidor.");
        }
      }
    }finally{
      setIsLoading(false);
    }
  };

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
                  Ingresa el codigo 
                </h2>
              </div>
              <div className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="space-y-2 rounded-md shadow-sm">
                  <p className="text-secondary">
                    Ingresa el codigo que te ha llegado a tu correo electronico 
                  </p>
                  <div>
                    <label htmlFor="recoverCode" className="sr-only">
                      Codigo de Validación 
                    </label>
                    <input
                      id="recoverCode"
                      name="recoverCode"
                      type="text"
                      required
                      className="relative block w-full rounded-md border-0 py-1.5 bg-primary text-secondary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm sm:leading-6 px-2"
                      placeholder="Codigo de Recuperación"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    variant="dark"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                    onClick={()=>handleSubmit()}
                     >
                    {isLoading ? "": <CheckCircle className="h-5 w-5 text-secondary group-hover:text-tertiary mr-2" aria-hidden="true"/> }
                    Validar Codigo 
                  </Button>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default ValidatePassword;
