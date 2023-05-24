import {useState,ChangeEvent} from "react";
import {Logo} from "../assets/images";
import {CheckCircle} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import axios from "axios";
import Button from '../components/ui/Button';


const RecoverPassword = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const queryParams = { email };
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL+"/public/auth/reset-password/code",null,{
        params: queryParams,
      });
      toast.success("Codigo Enviado Exitosamente");
      localStorage.setItem("email",email);
      setTimeout(() => navigate("/validate-code-password"),2000);
    }catch (error) {
      if (typeof error !== 'undefined' && error instanceof Error) {
        const errorResponse = error as { response?: { status: number } };
        if(errorResponse.response){
          if(errorResponse.response.status == 403){
            toast.error("El correo proporcionado no se encuentra en el sistema.");
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
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight blue-text-gradient">
                  Ingresa tu correo 
                </h2>
              </div>
              <div className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="space-y-2 rounded-md shadow-sm">
                  <p className="green-text-gradient">
                    Te llegara un codigo para re-establecer tu contraseña
                  </p>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Correo Electronico
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full rounded-md border-0 py-1.5 bg-primary text-secondary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm sm:leading-6 px-2"
                      placeholder="Correo Electronico"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    variant="colorbg"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                    onClick={()=>handleSubmit()}
                     >
                    {isLoading ? "": <CheckCircle className="h-5 w-5 text-secondary group-hover:text-tertiary mr-2" aria-hidden="true"/> }
                   Enviar Correo 
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <a href="/#/validate-code-password" className="font-medium blue-text-gradient hover:red-text-gradient">
                    Si ya tienes tu codigo ingresalo Aqui
                  </a>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default RecoverPassword;
