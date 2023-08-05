import {Suspense,useEffect,useState} from 'react';
import Home from './pages/Home';
import {BrowserRouter  as Router, Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import RecoverPassword from './pages/Recover-password';
import ValidatePassword from './pages/Validate-Code-Password';
import ResetPassword from './pages/Reset-password';
import MainStore from './pages/Store';
import MainStoreProduct from './pages/Store-Product';
import Giveaway from './pages/Giveaways';
import ValidateRegistration from './pages/ValidateRegistration';
import LoadingComponent from './components/shared/LoadingComponent';
import Providers from './components/Providers';
import NotAvailable from './components/shared/NotAvailable';

import { UserIt,FilterProductProps,Category } from './interfaces/global';
import {mapInputDataCategory} from './lib/utils';
import {toast} from "react-hot-toast";
import axios from 'axios';


function App() {

  const [user,setUser] = useState<UserIt|undefined>(undefined);

  const handlerUserState = (user:UserIt|undefined) => {
    setUser(user);
  };

  const CloseSession = () => {

    setUser(undefined);

    if(localStorage.getItem('user') !== null){
      localStorage.removeItem('user');
    }

    if(localStorage.getItem('user') !== null){
      localStorage.removeItem('token');
    }
  }

  useEffect(() => {

    const storedUser = localStorage.getItem('user');

    if (storedUser !== null) {
      setUser(JSON.parse(storedUser));
    }

  },[]);


  const [categories, setCategories] = useState<Category>({
    name:"default",
    featured:[],
    sections:[]
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDataCategoryFromServer = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/categories');
      await setCategories(mapInputDataCategory(response.data));
    }catch (err) {
      toast.error("Ha habido un error trayendo la información del servidor");
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    getDataCategoryFromServer();
  },[])


  const [filters,setFilters] = useState<FilterProductProps>({
    section:"All",
    category:"All",
    featured:  "All",
    order:"All",
    page: 1
  });


  const changeFilters = (filters:FilterProductProps) => {
    setFilters(filters);
  }

  return(
    <Suspense fallback={<LoadingComponent isLoading={true}/>}>
      <Providers>
          <Router>
            <Routes>
              <Route  path='/' 
                      element={<Home user={user} setUser={handlerUserState} closeSession={CloseSession}/>}
              />
              <Route path='/sign-in' 
                     element={<SignIn setUser={handlerUserState}/>} 
              />
              <Route path='/register' 
                     element={<Register />} 
              />
              <Route path='/recover-password' 
                     element={<RecoverPassword />}
              />
              <Route path='/validate-code-password' 
                     element={<ValidatePassword />} 
              />
              <Route path='/reset-password' 
                     element={<ResetPassword />} 
              />
              <Route path='/store' 
                     element={<MainStore user={user} 
                                         closeSession={CloseSession} 
                                         categories={categories} 
                                         isLoading={isLoading}
                                         filters={filters}
                                         changeFilters={changeFilters}
                              />} 
              />
              <Route path='/store/product/:id'  
                     element={<MainStoreProduct  user={user} 
                                         closeSession={CloseSession} 
                                         categories={categories} 
                                         isLoading={isLoading}
                                         filters={filters}
                                         changeFilters={changeFilters}
                              />}
              />
              <Route path='/store/checkout' 
                     element={<NotAvailable/>}
              />
              <Route path='/giveaways' 
                     element={<Giveaway user={user} 
                                         closeSession={CloseSession} 
                                         categories={categories} 
                                         isLoading={isLoading}
                                         filters={filters}
                                         changeFilters={changeFilters}
                              />}
              />
              <Route path='/validateregistration'
                     element={<ValidateRegistration/>}
              />
            </Routes>
          </Router>
      </Providers>
    </Suspense>
  ) 
}

export default App
