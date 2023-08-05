import { StoreNavbar,Giveaways } from '../components/storeandgiveaway'
import { UserIt,Category, FilterProductProps } from '../interfaces/global.ts'
import LoadingComponent from '../components/shared/LoadingComponent';

interface MainGiveawayProps {
  user : UserIt | undefined;
  closeSession : () => void;
  categories: Category;
  isLoading: boolean;
  filters: FilterProductProps;
  changeFilters: (filters: FilterProductProps) => void;
}

const MainGiveaway = (mainGiveawayProps:MainGiveawayProps) => {
  const { user, closeSession, categories, isLoading, filters,changeFilters } = mainGiveawayProps;

  if(isLoading){
    return(
      <LoadingComponent isLoading={isLoading} />
    )
  }else{
    return (
      <>
        <StoreNavbar user={user} closeSession={closeSession} categories={categories}  changeFilters={changeFilters} filtersParent={filters}/>
        <Giveaways user={user}/>
      </>
    )
  }
}

export default MainGiveaway;
