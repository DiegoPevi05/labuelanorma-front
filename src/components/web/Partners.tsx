import {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { PartnerHeader,ArrowLeft,ArrowRight,ArrowDown } from "../../assets/images";
import { SectionWrapper } from "../ui/hoc";
import { fadeIn, textVariant } from "../../lib/motion";
import {ExternalLink} from "lucide-react";
import { PartnerData,PartnerWebData } from '../../interfaces/web';
import Link from '../ui/Link';

interface PartnerCardProps extends PartnerData  {
  index:number;
}

const PartnerCard = (partnerCardProps:PartnerCardProps) => {
  const { index, id, name, description, image, link_content, brand_link, tags} = partnerCardProps;

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);


  return (
    <motion.div key={"PartnerCard_"+id}variants={fadeIn("right", "spring", index * 0.5, 0.75)} 
      initial='hidden'
      animate={show ? 'show' : 'hidden'}
      className={`red-orange-gradient p-3 sm:p-5 rounded-2xl h-auto md:w-[360px] w-full`}>
      <div className='relative w-full h-[270px] md:h-[400px] rounded-[20px]'
        >
            <iframe
              src={link_content}
              title={name}
              className="w-full h-full rounded-[20px]"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
        </div>
        <div className='relative mt-5'>
          <Link variant="dark" className="absolute w-auto right-0 top-0" 
              href={brand_link} target="_blank">
              Ir al Sitio
            <ExternalLink className="ml-2"/> 
          </Link>
          <h3 className='green-text-gradient font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary  text-[12px] md:text-[14px] h-[100px]'>{description}</p>
          <img src={image} alt={'brand_image'+id} className='relative w-[80px] md:w-[80px] h-auto object-contain' />
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag,indextag) => (
            <p
              key={`${tag}-${index}-${indextag}`}
              className={`text-[14px] blue-green-gradient rounded-md px-1 text-white hover:translate-y-[-5px] ease-in-out duration-700`}
            >
              #{tag}
            </p>
          ))}
        </div>
    </motion.div>
  );
};

interface PartnerProps {
  partnerWebData:PartnerWebData;
  partnersData:PartnerData[];
}

const Partners = (partnersProps:PartnerProps) => {

  const {partnerWebData,partnersData} = partnersProps
  const [ currentPartner,setCurrentPartner ] = useState(0);

  const beforePartner = () => {
    setCurrentPartner( currentPartner == 0 ? partnersData.length - 1  : currentPartner - 1);
  }

  const nextPartner = () => {
    setCurrentPartner(currentPartner == partnersData.length - 1  ? 0 : currentPartner + 1);
  }

  return (
    <>
      <div className="relative flex flex-col md:flex-row w-full h-full mx-auto px-4 md:px-0">
        <div className="relative flex flex-col w-full md:w-1/2 justify-center">
              <div className="relative flex flex-col w-full">
                <motion.div variants={textVariant()} className="flex w-full justify-center">
                  <img src={PartnerHeader} alt='store_header' className='relative w-[240px] md:w-[500px] h-auto object-contain' />
                </motion.div>
                <motion.p
                  variants={fadeIn("", "", 0.1, 1)}
                  className='hidden md:block mt-3 rounded-[20px] text-primary font-bold text-[17px] max-w-3xl leading-[30px]'
                >
                  {partnerWebData?.header ?? " "}
                </motion.p>
                <div className="hidden md:flex flex-row w-full justify-around items-center">
                  <img onClick={() => beforePartner()} src={ArrowLeft} alt='arrow_left' className='relative w-[200px] h-auto object-contain cursor-pointer' />
                  <img onClick={() => nextPartner()} src={ArrowRight} alt='arrow_right' className='relative w-[200px] h-auto object-contain cursor-pointer' />
                </div>
              </div>
          </div>
        <div className="relative flex flex-col w-full md:w-1/2 justify-center items-center">
            {partnersData.map((partner,index)=>(
              index === currentPartner && (   
                <PartnerCard key={`partner-${index}`} index={index} {...partner} />
              )
            ))}
        </div>
        <div className="flex md:hidden flex-row w-full justify-around items-center">
          <img onClick={() => beforePartner()} src={ArrowLeft} alt='arrow_left' className='relative w-[120px] h-auto object-contain cursor-pointer' />
          <img onClick={() => nextPartner()} src={ArrowRight} alt='arrow_right' className='relative w-[120px] h-auto object-contain cursor-pointer' />
        </div>
        <a href='#contact' className="absolute bottom-[0rem] right-[-20px] sm:bottom-[-20px] md:bottom-[10px] sm:right-[-70px] lg:right-[-30px] w-auto flex justify-center">
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

export default SectionWrapper(Partners, "partners","bg-dark h-screen sm:h-full");
