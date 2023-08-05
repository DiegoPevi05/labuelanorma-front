import {useState,useEffect} from 'react';
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/motion";
import {TrendingHeader,ArrowDown} from "../../assets/images";
import { VideoWebData } from '../../interfaces/web';

interface VideosProps{
  videoData:VideoWebData | undefined
}

const VideoSection = (videosProps:VideosProps) => {
  const {videoData } = videosProps;
  const [videoDataSection,setVideoDataSection] = useState<string[]|undefined>(undefined);
  const [videos, setVideos] = useState<string[]>([]);

  useEffect(()=>{
    if(videoData != undefined){
      setVideoDataSection(Object.values(videoData));
    }
  },[videoData])

  const windowWidth = window.innerWidth;
  useEffect(() => {
    if(videoDataSection){
      if(windowWidth >= 1024) { //lg
        setVideos(videoDataSection.slice(0,5));
      }else if (windowWidth >= 768) { //md
        setVideos(videoDataSection.slice(0, 3));
      }else if(windowWidth >= 640){ // sm
        setVideos(videoDataSection.slice(0, 4));
      }else { //
        setVideos(videoDataSection.slice(0, 4));
      }
    }
  }, [videoDataSection]);

  return (
    <div className="relative h-screen blue-green-gradient overflow-hidden" id="trending">
      <div className="flex flex-col sm:flex-row sm:flex-wrap h-full">
        {videos.map((video,index) => (
          <div
            key={`video-#${index}`}
            className="relative overflow-hidden cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/5 h-full border-8 border-transparent blue-green-gradient"
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          >
            <iframe
              src={video}
              title={`video-${index}`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-1 pointer-events-none">
        <img src={TrendingHeader} alt='HeaderVideos' className='relative w-[520px] h-[520px] object-contain' />
      </div>
      <a href='#store' className="absolute bottom-[40px] right-10 sm:right-0 w-auto flex justify-center">
        <motion.div
          variants={fadeIn("right", "spring", 4, 0.75)}
          className="w-[100px] sm:w-[150px] h-auto overflow-hidden flex justify-center items-center p-2"
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
  );
};

export default VideoSection;
