import { useState } from "react";
import { motion } from "framer-motion";
import {ZNEkeko,ContactHeader,ArrowDown} from "../../assets/images"
import { SectionWrapper } from "../ui/hoc";
import { slideIn,fadeIn } from "../../lib/motion";
import {toast} from "react-hot-toast";
import Button from '../ui/Button';
import axios from "axios";

interface FormProps {
  name:string;
  email:string;
  message:string;
}


const Contact = () => {

  const [Loading, setLoading] = useState<boolean>(false);

  const emptyData:FormProps = {
    name:"",
    email:"",
    message:""
  }

  const [form, setForm] = useState<FormProps>(emptyData);

  const handleChange = (event:any) => {
    const { target } = event;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };


  //which is the type of React Event hanlder
  const handleSubmit = async() => {
    setLoading(true);
    try{
      const config = {
        headers: {
          Authorization: import.meta.env.VITE_FORM_UATH_TOKEN
        }
      }
      await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/send-email-contact",form,config);
      setForm(emptyData);
      toast.success("Mensaje enviado con éxito");
    } catch(error){
      toast.error("No se ha podido enviar el mensaje");
    } finally{
      setLoading(false);
    }

  };

  return (
    <div
      className={`xl:mt-0 h-full flex lg:flex-row flex-col-reverse gap-0 lg:gap-10 overflow-hidden `}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='w-full lg:w-1/2  p-4 sm:p-8 rounded-2xl'>
        <div
          className='mt-0 flex flex-col gap-2 sm:gap-8 w-full'
        >

          <img src={ContactHeader} alt='contact_header' className='relative w-full sm:w-auto h-[100px] lg:h-[100px] xl:h-[150px] mb-0 xl:mb-[-60px]  object-contain' />
          <div className='flex flex-col'>
            <span className='red-text-gradient font-bold text-sm sm:text-lg mb-2 sm:mb-4'>Nombre</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="Cual es tu nombre?"
              className='bg-primary py-2 sm:py-4 px-6 text-secondary placeholder:text-secondary rounded-lg font-small sm:font-medium
                transition-color focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              '
            />
          </div>
          <div className='flex flex-col'>
            <span className='red-text-gradient font-bold text-sm sm:text-lg mb-2 sm:mb-4'>Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="Cual es tu correo?"
              className='bg-primary py-2 sm:py-4 px-6 text-secondary placeholder:text-secondary rounded-lg font-small sm:font-medium
                transition-color focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              '
            />
          </div>
          <div className='flex flex-col'>
            <span className='red-text-gradient font-bold text-sm sm:text-lg mb-2 sm:mb-4'>Mensaje</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder="Que quieres rajar?"
              className='bg-primary py-2 sm:py-4 px-6 text-secondary placeholder:text-secondary rounded-lg font-small sm:text-lg 
                transition-color focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              '
            />
          </div>
          <Button 
            type="submit" 
            isLoading={Loading} 
            className="text-lg"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </div>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='w-full lg:w-1/2 h-auto flex items-center '>
          <motion.img
            src={ZNEkeko}
            alt="BirthdayCake"
            className="w-full h-[140px] sm:h-[180px] lg:h-auto object-contain"
          />
      </motion.div>
      <a href='#' className="absolute top-40 right-4 w-auto flex justify-center">
        <motion.div
          variants={fadeIn("up", "spring", 3, 0.75)}
          className="w-auto h-[120px] sm:h-[150px] overflow-hidden flex justify-center items-center p-2"
          animate={{
            translateY: [1, -2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0
          }}
        >
          <motion.img
            src={ArrowDown}
            alt="Random Image"
            className="w-full h-full object-contain rotate-180"
          />
        </motion.div>
      </a>
    </div>
  );
};

export default SectionWrapper(Contact, "contact","blue-green-gradient");
