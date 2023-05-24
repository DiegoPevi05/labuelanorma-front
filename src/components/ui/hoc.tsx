import { motion } from "framer-motion";

import { styles } from "../../styles";
import { staggerContainer } from "../../lib/motion";

export const SectionWrapper = (Component:any, idName:string, globalClass?:string ) =>
  function HOC(props:any) {
    return (
      <div id={idName} className={`${globalClass}`}>
        <motion.section
          variants={staggerContainer()}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        >
          <span className='hash-span'>
            &nbsp;
          </span>

          <Component {...props}/>
        </motion.section>
      </div>
    );
  };

