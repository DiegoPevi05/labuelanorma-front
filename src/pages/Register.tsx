import {useState,ChangeEvent} from "react";
import {Logo} from "../assets/images";
import {CheckCircle} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import Button from "../components/ui/Button";
import axios from "axios";


const Register = () => {

  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({email:"",name:"",lastname:"",password:""});
  const [confirmPassword,setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name != "confirmPassword") {
      setRegisterData({ ...registerData, [name]: value });
    } else {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async () => {

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!regex.test(registerData.password)) {
        toast.error("La contraseña debe contener al menos 8 caracteres, una letra, un número y un carácter especial.");
        return;
    }

    if (registerData.password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/public/auth/register",registerData);
      toast.success("Cuenta creada Exitosamente");
      localStorage.setItem('token',response.data.token);
      setTimeout(() => navigate("/"),2000);
    }catch (error) {
      if (typeof error !== 'undefined' && error instanceof Error) {
        const errorResponse = error as { response?: { status: number } };
        if(errorResponse.response){
          if(errorResponse.response.status == 403){
            toast.error("No se ha podido crear la cuenta.");
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
                  Registrate Ingresa tus Datos 
                </h2>
              </div>
              <div className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="space-y-2 rounded-md shadow-sm">
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
                  <div>
                    <label htmlFor="firstname" className="sr-only">
                      Primer Nombre 
                    </label>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      autoComplete="firstname"
                      required
                      className="relative block w-full rounded-md border-0 py-1.5 bg-primary text-secondary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm sm:leading-6 px-2"
                      placeholder="Nombre"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="firstname" className="sr-only">
                      Apellido 
                    </label>
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      autoComplete="lastname"
                      required
                      className="relative block w-full rounded-md border-0 py-1.5 bg-primary text-secondary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm sm:leading-6 px-2"
                      placeholder="Apellido"
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
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="confirmPassword"
                      required
                      className="relative block w-full rounded-md border-0 py-1.5 bg-primary text-secondary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm sm:leading-6 px-2"
                      placeholder="confirmación contraseña"
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
                   Registrate 
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <a href="/#/sign-in" className="font-medium blue-text-gradient hover:red-text-gradient">
                    ¿Iniciar Sesión con una cuenta?
                  </a>
                </div>
              </div>
            </div>
          </div>
  </>
  )
}

export default Register;
