import {motion} from 'framer-motion';
import {Blanca} from "../../assets/images";

const LoadingComponent = ({ isLoading }:any) => {
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-secondary bg-opacity-70 z-[100]">
          <motion.div
            className="sm:relative  sm:my-0 w-[18rem] sm:w-[12rem] lg:w-[14rem] h-full flex justify-center items-center sm:p-2"
            animate={{
              rotate: [15, -15, 10, -10, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0
            }}
          >
          <motion.img
            src={Blanca}
            alt="Blanca dancing"
            className="w-full h-full object-contain"
          />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default LoadingComponent;
