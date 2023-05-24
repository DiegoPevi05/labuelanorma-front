import React, {useState,ChangeEvent} from "react";
import {Logo} from "../assets/images";
import {Lock} from "lucide-react"; 
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import axios from "axios";


const SignIn = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ email: "", password: ""});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/public/auth/authenticate", formData);
      localStorage.setItem('token',response.data.token);
      toast.success("Ingreso Exitoso");
      setTimeout(() => navigate("/"),2000);
    }catch (error) {
      if (typeof error !== 'undefined' && error instanceof Error) {
        const errorResponse = error as { response?: { status: number } };
        if(errorResponse.response){
          if(errorResponse.response.status == 403){
            toast.error("Tu contraseña o tu correo son invalidos.");
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
                  Ingresa a tu cuenta 
                </h2>
              </div>
              <div className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div className="my-4">
                    <label htmlFor="email-address" className="sr-only">
                      Correo Electronico
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full rounded-t-md border-0 py-1.5 bg-primary text-secondary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm sm:leading-6 px-2"
                      placeholder="Correo Electronico"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full rounded-b-md border-0 py-1.5 bg-primary text-secondary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm sm:leading-6 px-2"
                      placeholder="contraseña"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <a href="/#/recover-password" className="font-medium blue-text-gradient hover:blue-green-gradient">
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                <div className="w-full">
                  <Button
                    variant="colorbg"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                    onClick={()=>handleSubmit()}
                     >
                    {isLoading ? "" : <Lock className="h-5 w-5 text-secondary group-hover:text-tertiary mr-2" aria-hidden="true"/>}
                    Ingresar
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <a href="/#/register" className="font-medium blue-text-gradient hover:red-text-gradient">
                    ¿No tienes una cuenta?
                  </a>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default SignIn;
