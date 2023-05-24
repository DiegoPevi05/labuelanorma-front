import {useState,useEffect} from 'react';
import { Navbar,Hero,About,Giveaway,Videos,Partners,Store,Contact} from '../components/web';
import {ContentWeb} from '../constants';
import {formatDataExtracted} from '../lib/utils';
import {webContent} from '../interfaces/web'; 
import LoadingComponent from '../components/shared/LoadingComponent';

const Home = () => {

  const [webDataContent, setWebDataContent] = useState<webContent|undefined>(undefined);
  useEffect(() => {
    setWebDataContent(formatDataExtracted(ContentWeb.web));
  },[])

  if(webDataContent == undefined){
    return <LoadingComponent isLoading={true}/>
  }else{
    return(
      <>
        <Navbar/>
        <Hero heroData={webDataContent.hero}/>
        <About aboutData={webDataContent.about} socialData={webDataContent.social} />
        <Giveaway giveawayDataWeb={webDataContent.giveaway} giveawayData={ContentWeb.giveaway}/>
        <Videos videoData={webDataContent.video} />
        <Store storeData={ContentWeb.store} />
        <Partners partnerWebData={webDataContent.partner} partnersData={ContentWeb.partners} />
        <Contact/>
      </>
    )
  }
}

export default Home;
