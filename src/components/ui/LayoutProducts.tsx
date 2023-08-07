import { Fragment, useState} from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { X, ChevronDown, Filter, BoxSelect,Loader2  } from 'lucide-react'
import { WelcomeStore } from '../../assets/images'
import {FilterProductProps, Category} from "../../interfaces/global";
import Pagination from "../shared/Pagination.tsx";


const sortOptions:any = [
  { name: 'Lo Nuevo', current: false },
  { name: 'Precio: Menor a Mayor', current: false },
  { name: 'Precio: Mayor a Menor', current: false }
]


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface LayoutProductsProps {
  children: React.ReactNode;
  changeFilters: (filters: FilterProductProps) => void;
  filtersParent: FilterProductProps;
  categories: Category;
  currentPage: number;
  totalPages: number;
  selectedPage: (page:number) => void;
  loadingContent: boolean;
}

const LayoutProducts = (layoutProductProps:LayoutProductsProps) => {
  const { children,changeFilters,filtersParent, categories, currentPage, totalPages,selectedPage,loadingContent  } = layoutProductProps; 

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const updateSectionFilter = (section:string) => {
    changeFilters({...filtersParent, section:section});
  }

  const updateOrderOptionFilter = (orderOption:string) => {
    changeFilters({...filtersParent, order:orderOption});
  }

  return (
    <div className="blue-green-gradient min-h-screen">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto red-orange-gradient py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-secondary">Filtros</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-transparent p-2 text-secondary"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {categories.sections.map((category:any) => (
                        <button key={category.section} onClick={()=>updateSectionFilter(category.section)} className="block px-2 py-3 text-secondary font-bold">
                          {category.section}
                        </button>
                      ))}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


          <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-fifth pb-6 pt-24">
            <img src={WelcomeStore} alt='contact_header' className='relative h-32 w-auto  object-contain' />

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div >
                  <Menu.Button className="pl-24 group inline-flex justify-center text-sm font-medium text-secondary hover:text-primary">
                    Ordenar
                    <ChevronDown
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-secondary group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-primary shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option:any) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={()=>updateOrderOptionFilter(option.name)}
                              className={classNames(
                                active ? 'bg-gray-100 text-primary' : 'text-white',
                                'block px-4 py-2 text-sm w-full font-medium'
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <BoxSelect className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <Filter className="h-5 w-5 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Productos 
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <div className="hidden lg:block">
                <h3 className="sr-only">Categorias</h3>
                <ul role="list" className="space-y-4 border-b border-fifth pb-6 text-sm font-medium">
                  {categories?.sections.map((category:any) => (
                    <button key={category.section} onClick={()=>updateSectionFilter(category.section)} className="block px-2 py-3 text-secondary hover:text-primary font-bold">
                      {category.section}
                    </button>
                  ))}
                </ul>
              </div>
              {!loadingContent ?
                <>
                <div className="lg:col-span-3">
                  <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={selectedPage}  />
                  {children}
                </div>
                </>
              :
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-secondary bg-opacity-40 z-50">
                  <Loader2 className="text-center animate-spin text-primary h-[60px] w-[60px]"/>
                </div>
              }
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default LayoutProducts;
