import { useState,useEffect } from 'react'
import { StoreNavbar,ProductList} from '../components/storeandgiveaway'
import LayoutProducts from '../components/ui/LayoutProducts';
import LoadingComponent from '../components/shared/LoadingComponent';
import {products} from '../constants';
import {FilterProductProps,ProductIt} from '../interfaces/global';
import {ApplyFilterToProducts} from '../lib/utils';
import { useLocation } from 'react-router-dom';

const MainStore = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const section = searchParams.get('section');
  const category = searchParams.get('category');
  const [isLoading,] = useState<boolean>(false);
  const [productsShow,setProductsShow] = useState<ProductIt[]>([]);
  const [filters,setFilters] = useState<FilterProductProps>({
    section:section ? section : "All",
    category:category ? category : "All",
    size:"All",
    orderOption:"Most Popular"
  });


  const changeFilters = (filters:FilterProductProps) => {
    setFilters(filters);
  }

  useEffect(() => {
    const filteredProducts = ApplyFilterToProducts(products, filters);
    setProductsShow(filteredProducts);
  },[products,filters])

  if(isLoading){
    return(
      <LoadingComponent isLoading={isLoading} />
    )
  }else{
    return (
      <>
        <StoreNavbar />
        <LayoutProducts changeFilters={changeFilters} filtersParent={filters}>
          <ProductList products={productsShow}/>
        </LayoutProducts>
      </>
    )

  }
}

export default MainStore;
