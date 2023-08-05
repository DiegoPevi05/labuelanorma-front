import { useState,useEffect } from 'react'
import { StoreNavbar,ProductList} from '../components/storeandgiveaway'
import LayoutProducts from '../components/ui/LayoutProducts';
import LoadingComponent from '../components/shared/LoadingComponent';
import {FilterProductProps,ProductIt,Category,UserIt} from '../interfaces/global';
import {mapInputDataProducts} from '../lib/utils';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-hot-toast";

interface MainStoreProps {
  user : UserIt|undefined;
  closeSession : () => void;
  categories: Category;
  isLoading: boolean;
  filters: FilterProductProps;
  changeFilters: (filters: FilterProductProps) => void;
}

const MainStore = (mainStoreProps:MainStoreProps) => {

  const {user,closeSession,categories,isLoading, filters,changeFilters} = mainStoreProps;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const section = searchParams.get('section');
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const order = searchParams.get('order');


  useEffect(()=>{
    if(section != null){
      changeFilters({...filters, section:section});
    }

    if(category != null){
      changeFilters({...filters, category:category});
    }

    if(featured != null){
      changeFilters({...filters, featured:featured});
    }
    if(order != null){
      changeFilters({...filters, order:order});
    }
  },[section,category,featured,order])

  const [products,setProducts] = useState<ProductIt[]>([]);
  const [TotalPages,setTotalPages] = useState<number>(0);
  const [loadingContent,setLoadingContent] = useState<boolean>(false);

  useEffect(() => {
    const getDataProductsFromServer = async () => {
      setLoadingContent(true);
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/products-public',{
          params: filters
        });
        await setProducts(mapInputDataProducts(response.data.products.data));
        await setTotalPages(response.data.products.last_page);
      }catch (err) {
        toast.error("Ha habido un error trayendo los productos");
      }finally{
        setLoadingContent(false);
      }
    }
    getDataProductsFromServer();
  },[filters])

  const updatePageFilter = (page:number) => {
    changeFilters({...filters, page:page});
  }



  if(isLoading){
    return(
      <LoadingComponent isLoading={isLoading} />
    )
  }else{
    return (
      <>
        <StoreNavbar user={user} closeSession={closeSession} categories={categories} changeFilters={changeFilters} filtersParent={filters}/>
        <LayoutProducts changeFilters={changeFilters} filtersParent={filters} categories={categories} currentPage={filters.page} totalPages={TotalPages} selectedPage={updatePageFilter} loadingContent={loadingContent}>
          <ProductList products={products}/>
        </LayoutProducts>
      </>
    )

  }
}

export default MainStore;
