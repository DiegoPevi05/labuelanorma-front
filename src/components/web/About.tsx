import { motion } from "framer-motion";
import { styles } from "../../styles";
import { SectionWrapper } from "../ui/hoc";
import { fadeIn, textVariant,slideIn } from "../../lib/motion";
import { AboutHeader,ArrowDown,TikTok } from "../../assets/images";
import {Facebook,Instagram,Youtube} from "lucide-react";
import { AboutWebData,SocialWebData } from '../../interfaces/web';

interface AboutProps {
  aboutData: AboutWebData;
  socialData: SocialWebData;
}

const About = (aboutProps:AboutProps) => {
  const {aboutData,socialData} = aboutProps;
  return (
      <div className="w-full h-full flex flex-col sm:flex-row">
        <motion.div variants={slideIn("left","",0.5,0.75)} className="w-full h-[350px] sm:h-[600px] flex-col rounded-[20px] p-4 sm:p-6 red-orange-gradient">
          <motion.div variants={textVariant()}>
            <img src={AboutHeader} alt='about_us_header' className='relative w-[150px] sm:w-[400px] h-auto object-contain' />
          </motion.div>

          <motion.p
            variants={fadeIn("", "", 1, 0.75)}
            className='mt-4 text-secondary text-sm text-justify md:text-[15px] lg:text-[17px] max-w-3xl leading-[20px] sm:leading-[30px]'
          >
            {aboutData?.body ?? " "}
          </motion.p>
          <motion.div className="flex flex-row w-full h-auto mt-2 md:mt-8">
            <a id={"tiktok"} href={socialData?.tiktok ?? ""} target="_blank"className="flex w-auto h-auto justify-center cursor-pointer mx-auto">
              <img src={TikTok} className={`${styles.sectionAboutIcon} text-[#00dbcb] `}/> 
            </a>
            <a id={"facebook"} href={socialData?.facebook ?? ""} target="_blank" className="flex w-auto h-auto justify-center cursor-pointer mx-auto">
              <Facebook className={`${styles.sectionAboutIcon} text-[#00afe7]`}/> 
            </a>
            <a id={"instagram"} href={socialData?.instagram ?? ""} target="_blank" className="flex w-auto h-auto justify-center cursor-pointer mx-auto">
              <Instagram  className={`${styles.sectionAboutIcon} text-[#00d800]`}/> 
            </a>
            <a id={"Youtube"} href={socialData?.youtube ?? ""} target="_blank" className="flex w-auto h-auto justify-center cursor-pointer mx-auto">
              <Youtube className={`${styles.sectionAboutIcon} text-[#00e682]`}/> 
            </a>
          </motion.div>
        </motion.div>
        <div className="w-full h-full flex-col">
          <motion.div
            variants={fadeIn("left", "spring", 1.5, 0.75)}
            className='w-full flex items-center justify-center py-4 sm:py-0'
          >
            <img src={aboutData?.image} alt='ZullyNorma' className='relative w-full sm:w-[640px] h-[300px] sm:h-[640px] object-contain' />
          </motion.div>
        </div>
        <a href='#giveaway' className="absolute right-10 sm:right-0 w-auto flex justify-center">
          <motion.div
            variants={fadeIn("right", "spring", 4, 0.75)}
            className="w-[100px] sm:w-[150px] h-full overflow-hidden flex justify-center items-center p-2"
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
            alt="Arrow Down"
            className="w-full h-full object-contain"
          />
          </motion.div>
        </a>
      </div>
  );
};

export default SectionWrapper(About, "about","bg-dark h-screen sm:h-full");
