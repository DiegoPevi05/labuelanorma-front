import {useState,useEffect} from 'react'
import { UserIt } from '../../interfaces/global';
import { GiveawayHeader } from '../../assets/images'


const giveaways = [
  {
    id:1,
    imgUrl: "#",
    title: "Sorteo 1",
    description: "Descripcion del sorteo 1",
    expiredDate: "24-12-2020",
    alreadyIn: false
  },
  {
    id:2,
    imgUrl: "#",
    title: "Sorteo 2",
    description: "Descripcion del sorteo 1",
    expiredDate: "22-12-2020",
    alreadyIn: true
  },
  {
    id:3,
    imgUrl: "#",
    title: "Sorteo 3",
    description: "Descripcion del sorteo 1",
    expiredDate: "10-11-2020",
    alreadyIn: true
  },
  {
    id:4,
    imgUrl: "#",
    title: "Sorteo 4",
    description: "Descripcion del sorteo 1",
    expiredDate: "09-10-2020",
    alreadyIn: true
  },
  {
    id:5,
    imgUrl: "#",
    title: "Sorteo 5",
    description: "Descripcion del sorteo 1",
    expiredDate: "01-05-2023",
    alreadyIn: true
  }
]

export default function GiveawayList() {

  const [user,setUser] = useState<UserIt|undefined>(undefined);

  useEffect(()=>{
    const storageUser =localStorage.getItem('user');
    if(storageUser != null){
      setUser(JSON.parse(storageUser))
    }
  },[])

  return (
    <div className="blue-green-gradient w-full">
      <div className="px-4 py-16 sm:px-6 sm:py-12 lg:px-16 w-full">
        <img src={GiveawayHeader} alt='contact_header' className='relative h-48 w-auto  object-contain' />
        <div className="mt-6 flex flex-col w-full gap-4">
          {giveaways.map((giveaway) => (
            <div key={giveaway.id} className="flex flex-row relative red-orange-gradient p-2 rounded-md">
              <div className="aspect-h-1 w-1/3 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">
                <img
                  src={giveaway.imgUrl}
                  alt={giveaway.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 px-6 flex flex-col justify-between w-2/3">
                <div>
                  <h3 className="text-lg text-primary">
                    {giveaway.title}
                  </h3>
                  <p className="mt-1 text-sm text-primary">Descripcion: {giveaway.description}</p>
                  <p className="mt-1 text-sm text-primary">Fecha de Caducidad: {giveaway.expiredDate}</p>
                </div>
              {user ?
                <>
                  { giveaway.alreadyIn === false ?
                      <button
                        className="mt-10 ml-auto flex w-1/2 items-center justify-center rounded-md border border-transparent blue-green-gradient px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Participar 
                      </button>
                    :
                      <button
                        className="mt-10 ml-auto flex w-1/2 items-center justify-center rounded-md border border-transparent blue-green-gradient px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Ya estas Participando 
                      </button>
                  }
                </>
              :

                <div key="Contact Information" className="flex flex-col w-full py-6 gap-3">
                  <h2 className="text-tertiary text-[12px] ">Inicia Sesión para poder participar del sorteo</h2>

                  <a 
                    href="/#/sign-in"
                    className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[12rem] rounded-lg font-medium bg-tertiary text-primary align-middle hover:bg-lime-100 hover:text-tertiary focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-md"> 
                      Iniciar Sesión 
                  </a>
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
