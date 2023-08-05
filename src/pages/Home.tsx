import {useState,useEffect} from 'react';
import { Navbar,Hero,About,Giveaway,Videos,Partners,Store,Contact} from '../components/web';
import { UserIt } from '../interfaces/global';
import {WebContentFullData} from '../interfaces/web'; 
import LoadingComponent from '../components/shared/LoadingComponent';
import {toast} from "react-hot-toast";
import axios from 'axios';
import {mapInputData} from '../lib/utils';
import ErrorPage from "../components/shared/ErrorPage";

interface HomeProps{
  user:UserIt|undefined;
  setUser: (user:UserIt|undefined) => void;
  closeSession: () => void;
}

const Home = (homeProps:HomeProps) => {

  const {user,setUser,closeSession} = homeProps;

  const [webDataContent, setWebDataContent] = useState<WebContentFullData|undefined>(undefined);
  const [isLoading,setIsLoading] = useState<boolean>(true);
  const [Error,setError] = useState<boolean>(false);
  //axios to call api and get data
  const getDataFromServer = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/web-data');
      await setWebDataContent(mapInputData(response.data));
    }catch (err) {
      toast.error("Ha habido un error trayendo la información del servidor");
      setError(true);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDataFromServer();
  }, []);

  if(isLoading){
    return <LoadingComponent isLoading={isLoading}/>
  }else if(Error) {
      return <ErrorPage code={500} message={"Error interno del Servidor jode mas tarde"}/>
  }else{
    return(
      <>
        <Navbar user={user} setUser={setUser} closeSession={closeSession}/>
        <Hero heroData={webDataContent?.web?.hero}/>
        <About aboutData={webDataContent?.web?.about} socialData={webDataContent?.web?.social} />
        <Giveaway user={user} giveawayDataWeb={webDataContent?.web?.giveaway} giveawayData={webDataContent?.giveaway}/>
        <Videos videoData={webDataContent?.web?.video} />
        <Store storeData={webDataContent?.products} />
        <Partners partnerWebData={webDataContent?.web?.partner} partnersData={webDataContent?.partners} />
        <Contact/>
      </>
    )
  }
}

export default Home;
