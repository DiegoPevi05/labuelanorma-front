import {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { ArrowDown,GiveawayHeader,ScreenTV } from "../../assets/images";
import {ExternalLink} from "lucide-react";
import { SectionWrapper } from "../ui/hoc";
import { fadeIn, textVariant } from "../../lib/motion";
import { UserIt } from '../../interfaces/global';
import {GiveawayWebData,GiveawayData} from '../../interfaces/web';
import {toast} from "react-hot-toast";
import Button from '../ui/Button';
import Link from '../ui/Link';
import axios from "axios";


const user:UserIt = {
  name:"Diego",
  email:"diego10azul@hotmail.com",
  role:"USER",
  id:"123412312312"
}


interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface GiveawayProps {
  giveawayDataWeb: GiveawayWebData;
  giveawayData: GiveawayData;
}

const Giveaways = (giveawayProps:GiveawayProps) => {
  const {giveawayDataWeb,giveawayData} = giveawayProps; 
  //Generate a function that create a countDown in hours of giveawaData.expiredDate that format is string in dd-mm-yyyy hh:mm:ss
  const formatDate = (date:string):any => {
    const dateArray = date.split("-");
    const year = dateArray[2];
    const month = dateArray[1];
    const day = dateArray[0];
    return new Date(`${year}-${month}-${day}`);
  }

  const [time, setTime] = useState<Time>({ days: 0, hours:0,minutes:0,seconds:0 });
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if(giveawayData?.expiredDate && formatDate(giveawayData.expiredDate) > new Date()){
      let interval:any = null;
      if (seconds < 0) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        const second = Math.floor((formatDate(giveawayData.expiredDate) - new Date().getTime()) / 1000);
        if (second > 0) {
          const days = Math.floor(second / 86400);
          const hours = Math.floor((second % 86400) / 3600);
          const minutes = Math.floor((second % 3600) / 60);
          const seconds = Math.floor(second % 60);
          setTime({
            days,
            hours,
            minutes,
            seconds,
          });
          setSeconds(second);
        } else {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const [AlreadyIn,setAlreadyIn] = useState<boolean>(false);
  const [loadingParticipate, setLoadingParticipate] = useState<boolean>(false);

  //which is the type of React Event hanlder
  const handleSubmit = async() => {
    setLoadingParticipate(true);
    try{
      const config = {
        headers: {
          Authorization: "userToken"
        },
        params:{
          userid:user.id
        }
      }
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/public/giveaway/participant",config);
      //const response = { data: "Ya estas participando", status: "200" };
      toast.success(response.data);
      setAlreadyIn(true);
    } catch(error){
      toast.error("No se ha podido participar en el sorteo");
    } finally{
      setLoadingParticipate(false);
    }

  };

  return (
    <>
      <div className="relative flex flex-col md:flex-row w-full h-full mx-auto px-4 md:px-0">
        <div className="relative flex flex-col w-full h-1/2 md:h-full md:w-1/2 justify-center">
          <div className="relative flex flex-col w-full items-center gap-2">
                <motion.div variants={textVariant()} className="flex w-full justify-center">
                  <img src={GiveawayHeader} alt='store_header' className='relative w-[240px] md:w-[500px] h-auto object-contain' />
                </motion.div>
                <motion.p
                  variants={fadeIn("", "", 0.1, 1)}
                  className='block rounded-[20px] text-primary font-bold text-[18px] md:text-[20px] max-w-3xl leading-[30px] text-center'
                >
                  {giveawayDataWeb?.subheader ?? ""}
                </motion.p>
                <motion.p
                  variants={fadeIn("", "", 0.1, 1)}
                  className='block rounded-[20px] text-tertiary font-bold text-[16px] md:text-[24px] max-w-3xl leading-[30px] text-center'
                >
                  Ultimo Concurso: {giveawayData?.title ?? ""}
                </motion.p>
                <motion.p
                  variants={fadeIn("", "", 0.1, 1)}
                  className='block rounded-[20px] text-tertiary font-bold text-[16px] md:text-[22px] max-w-3xl leading-[30px] text-center'
                >
                  Descripción: {giveawayData?.description ?? ""}
                </motion.p>
                {!user ?
                  <>
                    { AlreadyIn === false ?
                        <Button 
                          variant="colorbg" 
                          isLoading={loadingParticipate}
                          onClick={handleSubmit}
                        >
                          Participar 
                        </Button>
                      :
                        <Button variant="colorbg">
                          Ya estas Participando 
                        </Button>
                    }
                  </>
                :

                  <div key="Contact Information" className="flex flex-col w-full items-center py-6 gap-3">
                    <h2 className="text-tertiary text-[12px] ">Inicia Sesión para poder participar del sorteo</h2>

                    <Link
                      variant="dark"
                      href="/sign-in">
                        Iniciar Sesión 
                    </Link>
                  </div>
                  }
                <Link variant="colorbg" size="sm" className="w-2/3"
                    href="/giveaways" target="_blank">
                  Ver más Sorteos 
                  <ExternalLink className="ml-2"/> 
                </Link>
              </div>
          </div>
        <div className="relative flex flex-col w-full md:w-1/2 h-1/2 md:h-full justify-start pt-10 md:pt-0 md:my-auto md:justify-center items-center">
          <motion.div variants={fadeIn("right", "spring", 0.5, 0.75)} 
            className={`bg-transparent relative h-auto md:w-full w-full flex flex-col`}>
            <img src={ScreenTV} alt='store_tv' className='relative w-[280px] lg:w-[400px] h-auto object-contain z-40'/>
            <div className="absolute top-[0px] left-[0px] w-[280px] lg:w-[400px] flex flex-col justify-center items-center h-full bg-primary bg-opacity-50 pr-[70px] sm:pr-20 lg:pr-28">
              <p className="w-full text-right text-[10px] lg:text-[14px] font-bold text-tertiary">Faltan poco</p>
              <p className="w-full text-right text-[12px] lg:text-[16px] font-bold text-tertiary">para que termine el sorteo</p>
              <p className="w-full text-right text-[35px] lg:text-[45px] font-bold text-tertiary">{time.days} dias</p>
              <p className="w-full text-right text-[40px] lg:text-[55px] font-bold text-tertiary">{time.hours/10 > 1 ? time.hours : "0"+time.hours}:{time.minutes/10 > 1 ? time.minutes : "0"+ time.minutes}:{time.seconds/10 > 1 ? time.seconds : "0" + time.seconds}</p>
            </div>
          </motion.div>

        </div>
        <a href='#trending' className="absolute bottom-[-60px] right-[-15px] sm:bottom-[-20px] md:bottom-[10px] sm:right-[-70px] lg:right-[-30px] w-auto flex justify-center z-[1000]">
          <motion.div
            variants={fadeIn("left", "spring", 1, 0.75)}
            className="w-[100px] md:w-[150px] h-auto overflow-hidden flex justify-center items-center p-2"
            animate={{
              translateY: [1, -1, 1],
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
            className="w-full h-full object-contain"
          />
          </motion.div>
          </a>
      </div>
    </>
  );
};

export default SectionWrapper(Giveaways, "giveaway","h-full red-orange-gradient");
