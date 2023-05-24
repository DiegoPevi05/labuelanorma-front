import  { useState } from 'react'
import { StoreNavbar,ProductDetail} from '../components/storeandgiveaway'
import LoadingComponent from '../components/shared/LoadingComponent';

const MainStoreProduct = () => {
  const [isLoading,] = useState<boolean>(false);

  if(isLoading){
    return(
      <LoadingComponent isLoading={isLoading} />
    )
  }else{
    return (
      <>
        <StoreNavbar/>
        <ProductDetail/>
      </>
    )

  }
}

export default MainStoreProduct;
