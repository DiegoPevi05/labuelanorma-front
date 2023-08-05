import { StoreNavbar,ProductDetail} from '../components/storeandgiveaway'
import LoadingComponent from '../components/shared/LoadingComponent';
import { UserIt,Category, FilterProductProps } from '../interfaces/global.ts'

interface MainStoreProductProps {
  user : UserIt | undefined;
  closeSession : () => void;
  categories: Category;
  isLoading: boolean;
  filters: FilterProductProps;
  changeFilters: (filters: FilterProductProps) => void;
}

const MainStoreProduct = (mainStoreProductProps:MainStoreProductProps) => {

  const {user,closeSession,categories,isLoading, filters,changeFilters} = mainStoreProductProps;

  if(isLoading){
    return(
      <LoadingComponent isLoading={isLoading} />
    )
  }else{
    return (
      <>
      <StoreNavbar user={user} closeSession={closeSession} categories={categories}  changeFilters={changeFilters} filtersParent={filters}/>
        <ProductDetail/>
      </>
    )

  }
}

export default MainStoreProduct;
