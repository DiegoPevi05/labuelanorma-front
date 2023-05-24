import {useState,useEffect} from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { StoreHeader,StoreGoHeader,ZNStore,ZNStoreBorder,LabelNew,ArrowDown,ArrowLeft,ArrowRight } from "../../assets/images";
import { SectionWrapper } from "../ui/hoc";
import { fadeIn, textVariant } from "../../lib/motion";
import { StoreData } from "../../interfaces/web";

interface PropsStoreItem extends StoreData {
  index: number;
}

const StoreItem = (propsStoreItem:PropsStoreItem) => {
  const {index, id,name, description, tags, image, href, price, isnew} = propsStoreItem

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      initial='hidden'
      animate={show ? 'show' : 'hidden'}
    >
      <div
        className='h-[300px] sm:h-full bg-secondary p-3 rounded-2xl w-[300px] hover:translate-y-[-10px] duration-300 ease-in-out shadow-cardlight'
      >
        <div className='relative w-full h-[100px] sm:h-[160px] cursor-pointer'
            onClick={() => window.open(href, "_blank")}
        >
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl '
          />
          {isnew == true && (
            <div className='absolute inset-0 flex justify-end m-0 card-img_hover'>
              <div
                className='w-16 h-16  flex justify-center items-center '
              >
                <img
                  src={LabelNew}
                  alt='source code'
                  className='w-full h-full object-contain'
                />
              </div>
            </div>
          )}
        </div>

        <div className='mt-5'>
          <div className="flex flex-row w-full justify-between">
            <h3 className='green-text-gradient font-bold text-[18px]'>{name}</h3>
            <p className={`${styles.heroSubText} green-text-gradient`}>${price}.00</p>
          </div>
          <p className='mt-2 text-primary text-[12px] sm:text-[14px]'>{description}</p>
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag,index) => (
            <p
              key={`tag-${id}-${index}`}
              className={`text-[14px] blue-green-gradient rounded-md px-1 text-white hover:translate-y-[-5px] ease-in-out duration-700`}
            >
              #{tag}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface PropsStore {
  storeData: StoreData[];
}

const Store = (propsStore:PropsStore) => {
  const {storeData} = propsStore;

  const [itemStore, setItemStore] = useState<StoreData[]>([]);
  const [currentCard,setCurrentCard] = useState(0);
  const [activeCarrousel,setActiveCarrousel] = useState(false);

  const  nextCard = () => {
    setCurrentCard(prevCurrentCard => (prevCurrentCard === itemStore.length - 1 ? itemStore.length - 1 : prevCurrentCard + 1));
  };

  const previousCard = () => {
    setCurrentCard(prevCurrentCard => (prevCurrentCard === 0 ? 0 : prevCurrentCard - 1) );
  }

  const windowWidth = window.innerWidth;
  useEffect(() => {
    if(windowWidth >= 1024) { //lg
      setItemStore(storeData.slice(0,3));
    }else if (windowWidth >= 768) { //md
      setItemStore(storeData.slice(0.2));
    }else if(windowWidth >= 640){ // sm
      setItemStore(storeData.slice(0,2));
    }else { //
      setItemStore(storeData);
      setActiveCarrousel(true);
    }
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <motion.div variants={textVariant()} className="relative flex flex-col sm:flex-row w-full h-1/3 sm:h-full justify-center items-center sm:justify-between">
        <img src={StoreHeader} alt='store_header' className='relative w-full sm:w-1/2 md:w-1/3 h-24 sm:h-auto object-contain' />

          <div className='w-1/3 h-auto  hidden md:block flex justify-center items-center '>
            <img src={ZNStore} alt='zully_normal' className='absolute w-full h-full top-0 left-0 object-contain' />
            <img src={ZNStoreBorder} alt='zully_normal_Border' className='absolute w-full h-full top-0 left-0 object-contain' />
          </div>
        <a href='/#/store' className="w-full sm:w-1/2 md:w-1/3 h-auto sm:h-auto flex justify-center">
            <motion.div
              variants={fadeIn("left", "spring", 1, 0.75)}
              className="w-auto h-36 sm:h-64 overflow-hidden flex justify-center items-center p-2"
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
              src={StoreGoHeader}
              alt="Random Image"
              className="w-full h-full object-contain"
            />
            </motion.div>
          </a>

        </motion.div>

      <div className='relative h-2/3 sm:h-full w-full mt-4 flex flex-col sm:flex-row md:flex-wrap gap-4 md:gap-2 md:gap-6'>
        {activeCarrousel ?
          <>
            {itemStore.map((item, index) => {
              return (
                <>
                  {currentCard === index && (
                    <StoreItem key={`project-${index}`} index={index} {...item} />
                  )}
                </>
              )
            })}
            <div className="flex flex-row w-full justify-start items-center">
              <img onClick={() => previousCard()} src={ArrowLeft} alt='arrow_left' className='relative w-[100px] h-auto object-contain cursor-pointer' />
              <img onClick={() => nextCard()} src={ArrowRight} alt='arrow_right' className='relative w-[100px] h-auto object-contain cursor-pointer' />
            </div>
          </>
          :
          <>
            {itemStore.map((item, index) => (
              <StoreItem key={`project-${index}`} index={index} {...item} />
            ))}
          </>
        }
        <a href='#partners' className="absolute bottom-[0rem] right-[-20px] sm:bottom-[-20px] md:bottom-[10px] sm:right-[-50px] lg:right-0 w-auto flex justify-center">
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
    </div>
  );
};

export default SectionWrapper(Store, "store","red-orange-gradient");
