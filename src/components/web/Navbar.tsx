import {Fragment,useState} from 'react';
import {Logo} from '../../assets/images';
import Button from '../ui/Button';
import { Dialog, Transition } from '@headlessui/react';
import {AlignJustify,X,Store,ShoppingCart,User,UserX,Gift } from 'lucide-react';
import ShoppingCartComp from '../../components/shared/ShoppingCart';
import { UserIt } from '../../interfaces/global';


interface NavIt {
  name:string;
  label:string;
  href:string;
}
const navigation:NavIt[] = [
  { name: 'About',label:'Nosotros', href: '#about' },
  { name: 'Giveaway', label:'Sorteos',href: '#giveaway' },
  { name: 'Videos',label:'Trending', href: '#trending' },
  { name: 'Store',label:'Tienda' ,href: '#store' },
  { name: 'Partners',label:'Colaboraciones', href: '#partners' },
  { name: 'Contact', label:'Contactanos',href: '#contact' }
]

interface userNavIt {
  icon : React.ReactNode;
  label : string;
  href : string;
}
const navigationUser:userNavIt[] = [
  { icon: <Gift/>,label:'Ver Sorteos', href: '/#/giveaways' },
  { icon: <Store/>,label:'Ir a la Cachina', href: '/#/store' },
]

interface NavProps {
  user: UserIt|undefined;
  setUser:(user:UserIt|undefined) => void;
  closeSession: () => void;
}
const Navbar = (navProps:NavProps) => {

  const { user, closeSession} = navProps;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toggleProfile,setToggleProfile] = useState(false);
  const [openShoppingCart,setOpenShoppingCart] = useState(false);


  const closeShoppingCart = () => {
    setOpenShoppingCart(false);
  }

  return (
    <div className="fixed top-0  h-[60px] sm:h-[80px] w-full z-[20] red-orange-gradient">
          <nav className="flex items-center justify-between px-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="/">
                <span className="sr-only">La Abuela Norma</span>
                <img
                  className="h-16 w-16 sm:h-20 sm:w-20"
                  src={Logo}
                  alt="LaAbuelaNorma"
                />
              </a>
            </div>
            <div className="flex lg:hidden flex-row gap-2 items-center justify-end">
              <button onClick={() => setOpenShoppingCart(!openShoppingCart)}>
                <span className="sr-only">Carrito</span>
                <ShoppingCart className="h-6 sm:h-8 w-8 text-secondary hover:text-primary"/>
              </button>
              <a href="/#/store">
                <span className="sr-only">Store</span>
                <Store className="h-6 sm:h-8 w-8 text-secondary hover:text-primary"/>
              </a>
              <a href="/#/giveaways">
                <span className="sr-only">Giveaway</span>
                <Gift className="h-6 sm:h-8 w-8 text-secondary hover:text-primary"/>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Abrir Menu Principal</span>
                <AlignJustify className="h-6 sm:h-8 w-8 text-secondary hover:text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-8 py-6">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-xl font-bold leading-6 text-secondary hover:text-primary">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <div className="flex flex-row gap-3 items-center justify-end">
              {user && 
                <span className="text-secondary">{"Hola "+user.name}</span>
              }
              <button onClick={() => setOpenShoppingCart(!openShoppingCart)}>
                <span className="sr-only">ShoppingCart</span>
                <ShoppingCart className="h-8 w-8 text-secondary hover:text-primary"/>
              </button>
              <a href="/#/store">
                <span className="sr-only">Store</span>
                <Store className="h-8 w-8 text-secondary hover:text-primary"/>
              </a>
              <a href="/#/giveaways">
                <span className="sr-only">Giveaway</span>
                <Gift className="h-8 w-8 text-secondary hover:text-primary"/>
              </a>
              {!user ?
                <a href="/#/sign-in" className="text-md font-semibold leading-6 text-secondary hover:text-primary">
                  Inicio de Sesion <span aria-hidden="true">&rarr;</span>
                </a>
                :
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
                            {navigationUser && navigationUser.map((navitem, index) => (
                              <a key={"item_"+index} className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-secondary hover:bg-gray-100 focus:ring-2 focus:ring-secondary" href={navitem.href}>
                                {navitem.icon}
                                {navitem.label}
                              </a>
                            ))}
                            <button className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-secondary hover:bg-gray-100 focus:ring-2 focus:ring-secondary" onClick={closeSession}>
                              <X className="text-secondary"/>
                              Cerrar Sesion 
                            </button>
                          </div>
                        </div>
                      }
                </div>
              }
              </div>
            </div>
          </nav>
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="lg:hidden h-screen" onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 overflow-hidden z-[30]">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                  <Dialog.Panel className="fixed inset-y-0 right-0 w-full overflow-y-auto  px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 red-orange-gradient">
                    <div className="flex items-center justify-between">
                      <a href="/">
                        <span className="sr-only">La Abuela Norma</span>
                        <img
                        className="h-20 w-20"
                          src={Logo}
                          alt=""
                        />
                      </a>
                      <button
                        type="button"
                        className="rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Cerrar Menu</span>
                        <X className="h-10 w-10 text-secondary hover:text-primary duration-300 ease-in-out" aria-hidden="true" />
                      </button>
                    </div>
                    {user && 
                      <div className="mt-2  relative flex flex-col">
                        <div className="mt-2 py-2 first:pt-0 last:pb-0">
                          {navigationUser && navigationUser.map((navitem, index) => (
                            <a key={"item_"+index} className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-lg text-primary hover:bg-secondary focus:ring-2 focus:ring-blue-500" href={navitem.href}>
                              {navitem.icon}
                              {navitem.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    }
                    <div className="mt-6 flow-root">
                      <div className="space-y-2">
                        <div className="space-y-2 py-6">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-lg px-3 py-2 text-lg font-semibold leading-7 text-secondary hover:text-primary"
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                        {!user ?
                          <div className="py-6">
                            <a href="/#/sign-in" className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-secondary hover:text-primary">
                              Iniciar Sesión
                            </a>
                          </div>
                        :
                        <Button size="lg" className="w-full" onClick={closeSession}> 
                          <UserX className="text-primary mr-2"/>
                          Cerrar Sesión
                        </Button>
                        }
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
          </Dialog>
        </Transition.Root>
        <ShoppingCartComp isOpen={openShoppingCart} closeShoppingCart={closeShoppingCart}/>
      </div>
  )
}

export default Navbar
