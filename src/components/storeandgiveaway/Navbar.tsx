import { Fragment, useState,useEffect } from 'react'
import {Logo,PeruFlag} from '../../assets/images'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {AlignJustify,X,ShoppingCart,User,ScrollText } from 'lucide-react';
import ShoppingCartComp from '../shared/ShoppingCart';
import { UserIt,StoreNavIt } from '../../interfaces/global';

const navigation:StoreNavIt = {
  categories: [
    {
      id: 'shop',
      name: 'Categorias',
      featured: [
        {
          name: 'Novedades',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'De Epoca',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'Clothing',
          name: 'Vestimenta y Accsesorios',
          categories: [
            { name: 'Chompas', href: '/store?section=Clothing&category=Chompas' },
            { name: 'Polos', href: '/store?section=Clothing&category=Polos' },
            { name: 'Gorras', href: '/store?section=Clothing&category=Gorras' },
            { name: 'Piñata', href: '/store?section=Clothing&category=Piñata' },
            { name: 'Lapiceros', href: '/store?section=Clothing&category=Lapiceros' },
            { name: 'Cuadernos', href: '/store?section=Clothing&category=Cuadernos' },
            { name: 'Aretes', href: '/store?section=Clothing&category=Aretes' }
          ],
        },
        {
          id: 'Food & Services',
          name: 'Comida y Servicios',
          categories: [
            { name: 'Paneton de la Abuela Norma', href: '/store?section=Food%20%26%20Services&category=Paneton%20de%20la%20Abuela%20Norma' },
            { name: 'Vino de la Abuela Norma', href: '/store?section=Food%20%26%20Services&category=Vino%20de%20la%20Abuela%20Norma' },
            { name: 'Entrada Meet & Greet', href: '/store?section=Food%20%26%20Services&category=Entrada%20Meet%20%26%20Greet' }
          ],
        },
      ],
    }
  ],
  pages: [
    { name: 'Tienda', href: '/store' },
    { name: 'Ir a Pagar', href: '/store/checkout' },
    { name:'Sorteos y Concursos', href: '/giveaways' }
  ],
}

/*const userData = {
  name:"Diego",
  email:"diego10azul@hotmail.com",
  role:"USER",
  id:"123412312312"
}*/

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function StoreNavbar() {
  const [open, setOpen] = useState(false)
  const [openShoppingCart,setOpenShoppingCart] = useState(false);
  const [toggleProfile,setToggleProfile] = useState(false);
  const [user,setUser] = useState<UserIt|undefined>(undefined);
  const [carItems,setCartItems] = useState<number>(0);

  useEffect(()=>{
    var storageUser = localStorage.getItem('user');
    if(storageUser){
      setUser(JSON.parse(storageUser))
    }
  },[])

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
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-primary pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6 text-secondary" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category:any) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-secondary text-secondary' : 'border-transparent text-secondary',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category:any) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item:any) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-secondary">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Compra Ahora 
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section:any) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-secondary">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.categories.map((item:any) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page:any) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-secondary">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {user ? 
                  <>
                    <div className="flow-root">
                      <a href="/userpanel" className="-m-2 block p-2 font-medium text-secondary">
                        Panel de Usuario 
                      </a>
                    </div>
                    <div className="flow-root">
                      <a href="/userpanel/order" className="-m-2 block p-2 font-medium text-secondary">
                      Historial de Compras 
                      </a>
                    </div>
                    <div className="flow-root">
                      <a href="/#" className="-m-2 block p-2 font-medium text-secondary">
                      Cerrar Sesion 
                      </a>
                    </div>
                  </>
                :
                  <>
                    <div className="flow-root">
                      <a href="#" className="-m-2 block p-2 font-medium text-secondary">
                       Iniciar Sesión 
                      </a>
                    </div>
                    <div className="flow-root">
                      <a href="#" className="-m-2 block p-2 font-medium text-secondary">
                        Registrate
                      </a>
                    </div>
                  </>
                }
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
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
                <AlignJustify className="h-6 w-6" aria-hidden="true" />
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
                  {navigation.categories.map((category:any) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-tertiary text-tertiary'
                                  : 'border-transparent text-primary hover:text-primary',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
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
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 z-[1000]">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-primary">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item:any) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-secondary">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section:any) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-secondary">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.categories.map((item:any) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
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
                  ))}

                  {navigation.pages.map((page:any) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-primary hover:text-tertiary"
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
                    <span className="ml-3 block text-sm font-medium text-primary">PEN</span>
                  </div>
                </div>
                <div className="flex">
                  <div onClick={() => setOpenShoppingCart(!openShoppingCart)} className="flex items-center p-2 cursor-pointer">
                    <ShoppingCart className="h-8 w-8 text-primary hover:text-white"/>
                    <span className="ml-2 text-sm font-medium text-primary group-hover:text-gray-800">{carItems}</span>
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

                                <a key="Panel de Usuario" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-secondary hover:bg-gray-100 focus:ring-2 focus:ring-secondary" href="/userpanel">
                                  <User className="text-secondary"/>
                                  Panel de Usuario 
                                </a>
                                <a key="Panel de Usuario" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-secondary hover:bg-gray-100 focus:ring-2 focus:ring-secondary" href="/userpanel/order">
                                  <ScrollText className="text-secondary"/>
                                  Historial de Compras 
                                </a>
                                <a key="Panel de Usuario" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-secondary hover:bg-gray-100 focus:ring-2 focus:ring-secondary" href="#">
                                  <X className="text-secondary"/>
                                  Cerrar Sesion 
                                </a>
                              </div>
                            </div>
                          }
                    </div>
                  </div>
                :
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a href="/sign-in" className="text-sm font-medium text-primary hover:text-tertiary">
                      Inciar Sesión
                    </a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <a href="/register" className="text-sm font-medium text-primary hover:text-tertiary">
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
