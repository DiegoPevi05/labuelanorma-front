import { Fragment, useState, useEffect} from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { X, ChevronDown, Filter, Minus, Plus, BoxSelect  } from 'lucide-react'
import { WelcomeStore } from '../../assets/images'
import {FilterProductProps} from "../../interfaces/global";


interface SectionProp {
  name:string;
  label:string;
  options:SectionOptionProp[];
}

interface SectionOptionProp{
  value:string;
  checked:boolean;
}

const sortOptions = [
  { name: 'Mas Popular', current: true },
  { name: 'Mas Comprado', current: false },
  { name: 'Lo Nuevo', current: false },
  { name: 'Precio: Menor a Mayor', current: false },
  { name: 'Precio: Mayor a Menor', current: false }
]

const sections:SectionProp[] = [
  { name: 'Clothing', 
    label: 'Ropa y Vestimenta', 
    options:[
      { value: 'Chompas',checked: false },
      { value: 'Polos', checked: false },
      { value: 'Gorras', checked: false },
      { value: 'Piñata', checked: false },
      { value: 'Lapiceros', checked: false },
      { value: 'Cuadernos', checked: false },
      { value: 'Aretes', checked: false }
    ]
  },
  { name: 'Food & Services',
    label:'Comida y servicios',
    options:[
      { value: 'Paneton de la Abuela Norma', checked: false },
      { value: 'Vino de la Abuela Norma', checked: false },
      { value: 'Entrada Meet & Greet', checked: false }
    ]
  }
]

interface SizesProps {
  id:string;
  name:string;
  options:SizesOptionProps[];
}

interface SizesOptionProps {
  value:string;
  label:string;
  checked:boolean;
}

const sizes = {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'XXS', label: 'XXS', checked: false },
      { value: 'XS', label: 'XS', checked: false },
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'L', label: 'L', checked: false },
      { value: 'XL', label: 'XL', checked: false },
      { value: '2XL', label: '2XL', checked: false },
      { value: '3XL', label: '3XL', checked: false }
    ],
  }

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface LayoutProductsProps {
  children: React.ReactNode;
  changeFilters: (filters: FilterProductProps) => void;
  filtersParent: FilterProductProps;
}

const LayoutProducts = (layoutProductProps:LayoutProductsProps) => {
  const { children,changeFilters,filtersParent } = layoutProductProps; 
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [currentFilters, ] = useState<FilterProductProps>(filtersParent);
  const [currentSection,setCurrentSection] = useState<SectionProp|undefined>(undefined);
  const [categories,setCategories] = useState<SectionOptionProp[]>([]);
  const [sizesOptions,setSizesOptions] = useState<SizesProps>(sizes);


  useEffect(()=>{
    if(filtersParent){
      if(filtersParent.section != 'All'){
        setCategories((prevState: SectionOptionProp[]) => {
          const findSection = sections.find(section => section.name === filtersParent.section);
          const updatedOptions = findSection?.options.map(item => {
            if (item.value === filtersParent.category) {
              return { ...item, checked: true };
            } else {
              return { ...item, checked: false };
            }
          });

          return updatedOptions || prevState;
        });
     } 

     if(filtersParent.size != 'All'){
       setSizesOptions(prevSizeOptions => {
         const updatedSizes = sizesOptions?.options.map(size => {
           if(size.value === filtersParent.size){
             return { ...size, checked:true }
           }else{
              return { ...size,checked:false }
           }
         })
         return {...prevSizeOptions, options:updatedSizes};
       });
     }
    }

  },[filtersParent])

  const updateSectionFilter = (section:string) => {
    changeFilters({...currentFilters, section:section});
    setCurrentSection(sections.filter((item) => item.name === section)[0]);
  }

  const updateCategoryFilter = (category:string) => {
    changeFilters({...currentFilters, section:filtersParent.section, category:category});
  }

  const updateSizeFilter = (size:string) => {
    changeFilters({...currentFilters,section:filtersParent.section, category:filtersParent.category, size:size});
  }

  const updateOrderOptionFilter = (orderOption:string) => {
    changeFilters({...currentFilters, orderOption:orderOption});
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

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {sections.map((category) => (
                        <button key={category.name} onClick={()=>updateSectionFilter(category.name)} className="block px-2 py-3 text-secondary font-bold">
                          {category.label}
                        </button>
                      ))}
                    </ul>

                    {currentSection != undefined && (
                          <Disclosure as="div" key={currentSection?.name?? ""} className="border-t border-gray-200 px-4 py-6">
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between red-orange-gradient rounded-md py-3 px-4 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-white">{currentSection?.name?? " "}</span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <Minus className="h-5 w-5 text-white" aria-hidden="true" />
                                      ) : (
                                        <Plus className="h-5 w-5 text-white" aria-hidden="true" />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {categories?.map((option, optionIdx) => (
                                      <div key={option.value} className="flex items-center">
                                        <input
                                          id={`filter-mobile-${currentSection.name}-${optionIdx}`}
                                          name={`${currentSection.name}[]`}
                                          defaultValue={option.value}
                                          type="checkbox"
                                          checked={option.checked}
                                          onChange={()=>updateCategoryFilter(option.value)}
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                          htmlFor={`filter-mobile-${currentSection.name}-${optionIdx}`}
                                          className="ml-3 min-w-0 flex-1 text-white"
                                        >
                                          {option.value}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                      )}

                      <Disclosure as="div" key={sizesOptions.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between red-orange-gradient rounded-md py-3 px-4 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-white">{sizesOptions.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <Minus className="h-5 w-5 text-white" aria-hidden="true" />
                                  ) : (
                                    <Plus className="h-5 w-5 text-white" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {sizesOptions.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${sizesOptions.id}-${optionIdx}`}
                                      name={`${sizesOptions.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      checked={option.checked}
                                      onChange={()=>updateSizeFilter(option.value)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${sizesOptions.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-white"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-secondary pb-6 pt-24">
            <img src={WelcomeStore} alt='contact_header' className='relative h-32 w-auto  object-contain' />
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-white hover:text-secondary">
                    Sort
                    <ChevronDown
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white group-hover:text-secondary"
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
                      {sortOptions.map((option) => (
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
              {/* Filters */}
              <div className="hidden lg:block">
                <h3 className="sr-only">Categorias</h3>
                <ul role="list" className="space-y-4 border-b border-secondary pb-6 text-sm font-medium">
                  {sections.map((category) => (
                    <button key={category.name} onClick={()=>updateSectionFilter(category.name)} className="block px-2 py-3 text-secondary font-bold">
                      {category.label}
                    </button>
                  ))}
                </ul>

                {currentSection != undefined && (
                  <Disclosure as="div" key={currentSection?.name?? " "} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between red-orange-gradient rounded-md py-3 px-4 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-white">{currentSection?.name?? " "}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <Minus className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <Plus className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {categories?.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${currentSection.name}-${optionIdx}`}
                                  name={`${currentSection.name}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={option.checked}
                                  onChange={()=>updateCategoryFilter(option.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${currentSection.name}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.value}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}

                  <Disclosure as="div" key={sizesOptions.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between red-orange-gradient rounded-md py-3 px-4 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-white">{sizesOptions.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <Minus className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <Plus className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {sizesOptions.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${sizesOptions.id}-${optionIdx}`}
                                  name={`${sizesOptions.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={option.checked}
                                  onChange={()=>updateSizeFilter(option.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${sizesOptions.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
              </div>
              <div className="lg:col-span-3">
                {children}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default LayoutProducts;
