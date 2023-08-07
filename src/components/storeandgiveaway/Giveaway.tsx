import {useState,useEffect} from 'react'
import { UserIt } from '../../interfaces/global';
import {GiveawayData} from '../../interfaces/web';
import { GiveawayHeader } from '../../assets/images'
import {mapInputGiveawaysData} from '../../lib/utils.ts';
import Pagination from '../shared/Pagination';
import {toast} from "react-hot-toast";
import axios from 'axios';
import Button from '../ui/Button';
import Link from '../ui/Link';

interface GiveawayListProps {
  user: UserIt | undefined;
}

export default function GiveawayList(giveawayListProps: GiveawayListProps) {

  const { user } = giveawayListProps;

  const [CurrentPage,setCurrentPage] = useState<number>(1);
  const [Giveaways, setGiveaways] = useState<GiveawayData[]|undefined>([]);
  const [TotalPages,setTotalPages] = useState<number>(0);

  const getDataGiveaways = async () => {
    try {
      var response = null;
      const storageToken =localStorage.getItem('token');
      if(user != undefined && storageToken != null){
        const headers = {
          'Authorization': 'Bearer ' + storageToken,
        }
        response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/giveaways-user?page='+CurrentPage,{headers});
      }else{
        response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/giveaways-all?page='+CurrentPage);
      }
      await setGiveaways(mapInputGiveawaysData(response.data.giveaways.data));
      await setTotalPages(response.data.giveaways.last_page);
    }catch (err) {
      toast.error("Ha habido un error trayendo la información de los sorteos");
    } 
  }

  const [LoadingContest,setLoadingContest] = useState<boolean>(false);

  const ParticipateInGiveaway = async (giveaway_id:number) => {
    setLoadingContest(true);
    try {
      var response = null;
      const storageToken =localStorage.getItem('token');
      if(user != undefined && storageToken != null){
        const headers = {
          'Authorization': 'Bearer ' + storageToken,
        }
        const body = {
          giveaway_id:giveaway_id, 
          user_id:user.id 
        }
        response = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/giveaway-participate',body,{headers});
        toast.success(response.data.message);
        updateLocalGiveaway(giveaway_id);
      }else{
        toast.error("Debes iniciar sesión para participar en un sorteo o vuelve a iniciar sesión");
      }
    }catch (err:any) {
      toast.error(err.response.data.message);
    }finally{
      setLoadingContest(false);
    }
  }

  const updateLocalGiveaway = (giveaway_id:number) => {
    var newGiveaways = Giveaways;
    newGiveaways?.forEach((giveaway:any) => {
      if(giveaway.id == giveaway_id){
        giveaway.alreadyIn = true;
      }
    });
    setGiveaways(newGiveaways);
  }

  useEffect(() => {
    getDataGiveaways();
  }, [CurrentPage,user]);


  return (
    <div className="blue-green-gradient w-full min-h-screen">
      <div className="px-4 py-16 sm:px-6 sm:py-12 lg:px-16 w-full">
        <img src={GiveawayHeader} alt='contact_header' className='relative h-48 w-auto  object-contain' />
        <h1 className="my-2 text-lg text-fourth">!Importante¡ te llegara un correo si llegas a ganar el sorteo, Buena Suerte!</h1>
        <Pagination currentPage={CurrentPage} totalPages={TotalPages} setCurrentPage={setCurrentPage}  />
        <div className="mt-6 flex flex-col w-full gap-4">
          {Giveaways?.map((giveaway:any) => (
            <div key={giveaway.id} className="flex flex-row relative red-orange-gradient p-2 rounded-md">
              <div className="aspect-h-1 w-1/3 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">
                <img
                  src={giveaway.image_url}
                  alt={giveaway.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 px-6 flex flex-col justify-between w-2/3">
                <div>
                  <h3 className="text-lg text-primary">
                    {giveaway.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary">Descripcion: {giveaway.description}</p>
                  <p className="mt-1 text-sm text-primary">Fecha de Caducidad: {giveaway.end_date}</p>
                </div>
              {user ?
                <>
                  { giveaway.alreadyIn === false ?
                      <Button
                        variant="dark"
                        className="mt-10 ml-auto flex w-1/2"
                        isLoading={LoadingContest}
                        onClick={()=>ParticipateInGiveaway(giveaway.id)}
                      >
                        Participar 
                      </Button>
                    :
                      <Button
                        variant="dark"
                        className="mt-10 ml-auto flex w-1/2"
                        disabled
                      >
                        Ya estas Participando 
                      </Button>
                  }
                </>
              :

                <div key="Contact Information" className="flex flex-col w-full py-6 gap-3">
                  <h2 className="text-secondary text-[12px] ">Inicia Sesión para poder participar del sorteo</h2>

                  <Link 
                    variant="dark"
                    href="/sign-in"
                    className="sm:w-[12rem]"> 
                      Iniciar Sesión 
                  </Link>
                </div>
                }

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
