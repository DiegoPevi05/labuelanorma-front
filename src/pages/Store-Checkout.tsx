import { StoreNavbar,CheckoutStore } from '../components/storeandgiveaway'
import { UserIt,Category, FilterProductProps } from '../interfaces/global.ts'
import LoadingComponent from '../components/shared/LoadingComponent';

interface MainStoreCheckoutProps {
  user : UserIt | undefined;
  closeSession : () => void;
  categories: Category;
  isLoading: boolean;
  filters: FilterProductProps;
  changeFilters: (filters: FilterProductProps) => void;
}

const Checkout = (mainStoreCheckoutProps:MainStoreCheckoutProps) => {

  const { user, closeSession, categories, isLoading, filters,changeFilters } = mainStoreCheckoutProps;


  if(isLoading){
    return(
      <LoadingComponent isLoading={isLoading} />
    )
  }else{
    return (
      <>
        <StoreNavbar user={user} closeSession={closeSession} categories={categories}  changeFilters={changeFilters} filtersParent={filters}/>
        <CheckoutStore/>
      </>
    )
  }
}

export default Checkout;
