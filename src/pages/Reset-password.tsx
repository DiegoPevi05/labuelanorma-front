import {useState,ChangeEvent} from "react";
import {Logo} from "../assets/images";
import {Lock } from "lucide-react"; 
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '../components/ui/Button';


const RecoverPassword = () => {

  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async () => {

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!regex.test(password)) {
        toast.error("La contraseña debe contener al menos 8 caracteres, una letra, un número y un carácter especial.");
        return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    const email = localStorage.getItem("email");
    const recoverCode  = localStorage.getItem("recoverCode")
    const body = { email,recover_token: recoverCode, new_password:password };
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/reset-password",body);
      localStorage.removeItem("email");
      localStorage.removeItem("recoverCode");
      toast.success("Contraseña Actualizada exitosamente");
      setTimeout(() => navigate("/sign-in"),2000);
    }catch (error) {
      if (typeof error !== 'undefined' && error instanceof Error) {
        const errorResponse = error as { response?: { status: number } };
        if(errorResponse.response){
          if(errorResponse.response.status == 403){
            toast.error("No se ha podido actualizar la contraseña.");
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
                  Ingresa tu nueva contraseña 
                </h2>
              </div>
              <div className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="space-y-2 rounded-md shadow-sm">
                  <p className="text-secondary">
                    Actualiza tu contraseña 
                  </p>
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
                      className="relative block w-full rounded-md border-0 py-1.5 bg-primary text-secondary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm sm:leading-6 px-2"
                      placeholder="contraseña"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="re-password" className="sr-only">
                      Confirmación Contraseña
                    </label>
                    <input
                      id="onfirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full rounded-md border-0 py-1.5 bg-primary text-secondary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm sm:leading-6 px-2"
                      placeholder="confirma contraseña"
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
                    {isLoading ? "" : <Lock className="h-5 w-5 text-secondary group-hover:text-tertiary mr-2" aria-hidden="true"/>}
                    Cambiar Contraseña 
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <a href="/sign-in" className="font-medium text-secondary hover:text-primary">
                    ¿Iniciar Sesión con una cuenta?
                  </a>
                </div>
              </div>
            </div>
          </div>
  </>
  )
}

export default RecoverPassword;
