import {motion} from 'framer-motion';
import { styles } from '../../styles';
import { fadeIn ,slideIn,staggerContainer} from "../../lib/motion";
import {HeroLogo,Blanca} from "../../assets/images";
import {HeroWebData} from '../../interfaces/web';

interface HeroProps {
  heroData:HeroWebData | undefined;
}

const Hero = (heroProps:HeroProps) => {
  const {heroData} = heroProps;
  return (
    <section className="w-full h-screen mx-auto z-[10] overflow-hidden bg-secondary">
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col items-center w-full h-full"
      >
        <div className={`relative ${styles.paddingX} w-full flex flex-row h-full lg:h-3/4 items-center`}>
          <motion.div
            variants={fadeIn("right", "spring", 1, 0.75)}
            className='hidden lg:block w-2/4 h-auto blue-green-gradient p-2 rounded-[20px] shadow-card'

          >
            <div
              className='red-orange-gradient h-full flex justify-center rounded-[20px] py-5 px-12 flex'
            >
                <iframe
                  src={heroData?.video ?? ""}
                  title={`video-hero`}
                  className="w-full lg:h-[300px] xl:h-[400px]"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "spring", 2, 0.75)}
            className='w-full lg:w-2/4 h-full sm:h-full flex items-center justify-center'
          >
            <img src={HeroLogo} alt='Herologo' className='w-full h-[24rem] sm:my-0 sm:h-[34rem] object-contain' />
          </motion.div>
        </div>

        <div className="relative h-full lg:h-1/4 sm:w-full flex flex-row items-center justify-between">

          <motion.div variants={slideIn("left", "", 3, 0.2)} className="hidden sm:block w-3/4 h-full flex flex-col">
            <h2 className={`sm:text-2xl lg:text-4xl h-1/4 text-primary hover:text-secondary font-black red-orange-gradient text-right pt-2 pr-4 rounded-r-lg`}>{heroData?.header ?? " "}</h2>
          </motion.div>

          <a href='#about' className="relative w-full sm:w-1/4 flex justify-center">
              <motion.div
                variants={fadeIn("right", "spring", 4, 0.75)}
                className="sm:relative sm:-top-24 -mt-24 sm:my-0 w-[18rem] sm:w-[12rem] lg:w-[14rem] h-full flex justify-center items-center sm:p-2"
                animate={{
                  rotate: [15, -15, 10, -10, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 2
                }}
              >
              <motion.img
                src={Blanca}
                alt="Blanca dancing"
                className="w-full h-full object-contain"
              />
              </motion.div>
          </a>
        </div>
      </motion.section>
    </section>
  )
}

export default Hero
