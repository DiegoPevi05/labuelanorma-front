import { Fragment, useState,useEffect } from 'react'
import {Logo,PeruFlag} from '../../assets/images'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {AlignJustify,X,ShoppingCart,User } from 'lucide-react';
import ShoppingCartComp from '../shared/ShoppingCart';
import { UserIt,StoreNavIt,FilterProductProps,Category } from '../../interfaces/global';

const navigation:StoreNavIt = {
  pages: [
    { name: 'Tienda', href: '/store' },
    { name:'Sorteos y Concursos', href: '/giveaways' }
  ],
}


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface StoreNavbarProps {
  user : UserIt|undefined;
  closeSession: () => void;
  categories:Category;
  changeFilters: (filters: FilterProductProps) => void;
  filtersParent: FilterProductProps;
}

export default function StoreNavbar(storeNavbarProps:StoreNavbarProps) {
  const { user, closeSession,categories,changeFilters,filtersParent} = storeNavbarProps;

  const [open, setOpen] = useState(false)
  const [openShoppingCart,setOpenShoppingCart] = useState(false);
  const [toggleProfile,setToggleProfile] = useState(false);
  const [carItems,setCartItems] = useState<number>(0);

  const updateCategoryFilter = (category:string) => {
    changeFilters({...filtersParent, category:category});
  }

  const updateFeaturedFilter = (featured:string) => {
    changeFilters({...filtersParent, featured:featured});
  }

  useEffect(()=> {
    var storageCart = localStorage.getItem('cart');
    if(storageCart != null){
      setCartItems( JSON.parse(storageCart) ? JSON.parse(storageCart).length : 0 );
    }
  },[openShoppingCart])

  const closeShoppingCart = () => {
    setOpenShoppingCart(false);
  }

  return (
    <div className="bg-white z-1000">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative  lg:hidden" onClose={setOpen}>
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

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto red-orange-gradient pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6 text-secondary hover:text-primary cursor-pointer" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                        <Tab
                          key={categories.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-primary text-fourth' : 'border-transparent text-secondary',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          Categorias
                        </Tab>
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                      <Tab.Panel key={categories.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {categories.featured.map((item:any) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <button onClick={()=>updateFeaturedFilter(item.name)} className="mt-6 block font-medium text-secondary">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </button>
                              <p aria-hidden="true" className="mt-1 text-primary">
                                Compra Ahora 
                              </p>
                            </div>
                          ))}
                        </div>
                        {categories.sections.map((section:any) => (
                          <div key={section.section}>
                            <p id={`Section-${section.section}-heading-mobile`} className="font-medium text-secondary">
                              {section.section}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`Section-${section.section}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.categories.map((item:any) => (
                                <li key={`${item.id}-${item.name}`} className="flow-root">
                                  <button onClick={()=>updateCategoryFilter(item.name)} className="-m-2 block p-2 text-primary hover:text-tertiary">
                                    {item.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page:any) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-secondary hover:text-primary">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {user ? 
                  <>
                    {/*
                    <div className="flow-root">
                      <a href="/userpanel" className="-m-2 block p-2 font-medium text-secondary hover:text-primary">
                        Panel de Usuario 
                      </a>
                    </div>
                    <div className="flow-root">
                      <a href="/userpanel/order" className="-m-2 block p-2 font-medium text-secondary hover:text-primary">
                      Historial de Compras 
                      </a>
                    </div>
                    */}                    
                    <div className="flow-root">
                      <button onClick={closeSession} className="-m-2 block p-2 font-medium text-secondary hover:text-primary">Cerrar Sesión</button>
                    </div>
                  </>
                :
                  <>
                    <div className="flow-root">
                      <a href="/sign-in" className="-m-2 block p-2 font-medium text-secondary hover:text-primary">
                       Iniciar Sesión 
                      </a>
                    </div>
                    <div className="flow-root">
                      <a href="/register" className="-m-2 block p-2 font-medium text-secondary hover:text-primary">
                        Registrate
                      </a>
                    </div>
                  </>
                }
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="/" className="-m-2 flex items-center p-2">
                    <img
                      src={Logo}
                      alt=""
                      className="block h-auto w-12 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">PEN</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative red-orange-gradient">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md p-2 text-primary lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <AlignJustify className="h-6 w-6 text-secondary hover:text-fourth" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-16 w-auto"
                    src={Logo}
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                    <Popover key={categories.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-primary text-primary'
                                  : 'border-transparent text-secondary hover:text-primary',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              Categorias
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-fourth z-[1000]">
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-secondary">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {categories.featured.map((item:any) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <button onClick={()=>updateFeaturedFilter(item.name)} className="mt-6 block font-medium text-primary">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </button>
                                          <p aria-hidden="true" className="mt-1">
                                            Comprar Ahora 
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {categories.sections.map((section:any) => (
                                        <div key={section.section}>
                                          <p id={`${section.section}-heading`} className="font-medium text-primary">
                                            {section.section}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.section}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.categories.map((item:any) => (
                                              <li key={item.name} className="flex">
                                                <button onClick={()=>updateCategoryFilter(item.section)} className="hover:text-primary">
                                                  {item.name}
                                                </button>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>

                  {navigation.pages.map((page:any) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-secondary hover:text-primary"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center gap-2">
                <div className="hidden lg:flex">
                  <div className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      src={PeruFlag}
                      alt="PeruIcon"
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium text-secondary">PEN</span>
                  </div>
                </div>
                <div className="flex">
                  <div onClick={() => setOpenShoppingCart(!openShoppingCart)} className="flex items-center p-2 cursor-pointer">
                    <ShoppingCart className="h-8 w-8 text-secondary hover:text-primary"/>
                    <span className="ml-2 text-sm font-medium text-secondary group-hover:text-primary">{carItems}</span>
                  </div>
                </div>

                {user ? 
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                        <button onClick={()=>setToggleProfile(!toggleProfile)} id="hs-dropdown-with-header" 
                      className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-10 w-10 rounded-full  bg-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white transition-all text-xs">
                        <User className="h-8 w-auto text-secondary"/>
                        </button>
                          {toggleProfile && 
                              <div className="absolute top-12 right-1 bg-white rounded-lg p-2">
                                <div className="py-3 px-5 -m-2 bg-primary rounded-t-lg">
                                <p className="text-sm text-secondary">Registrado como</p>
                                <p className="text-sm font-medium text-secondary">{user.email}</p>
                              </div>
                              <div className="mt-2 py-2 first:pt-0 last:pb-0">

                                {/*
                                <a key="Panel de Usuario" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-secondary hover:bg-gray-100 focus:ring-2 focus:ring-secondary" href="/userpanel">
                                  <User className="text-secondary"/>
                                  Panel de Usuario 
                                </a>
                                <a key="Panel de Usuario" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-secondary hover:bg-gray-100 focus:ring-2 focus:ring-secondary" href="/userpanel/order">
                                  <ScrollText className="text-secondary"/>
                                  Historial de Compras 
                                </a>
                                  */}
                                <button key="Panel de Usuario" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-secondary hover:bg-gray-100 focus:ring-2 focus:ring-secondary" onClick={closeSession}>
                                  <X className="text-secondary"/>
                                  Cerrar Sesion 
                                </button>
                              </div>
                            </div>
                          }
                    </div>
                  </div>
                :
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a href="/sign-in" className="text-sm font-medium text-secondary hover:text-primary">
                      Inciar Sesión
                    </a>
                    <span className="h-6 w-px bg-secondary" aria-hidden="true" />
                    <a href="/register" className="text-sm font-medium text-secondary hover:text-primary">
                      Registrate 
                    </a>
                  </div>
                }
              </div>
            </div>
          </div>
        </nav>
      </header>
      <ShoppingCartComp isOpen={openShoppingCart} closeShoppingCart={closeShoppingCart}/>
    </div>
  )
}
