import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import {ItemShopCart} from '../../interfaces/global';
import Button from '../ui/Button';



function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductOverview() {
  const location = useLocation();
  const product = location.state.productDetail;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [qtyProduct,setQtyProduct] = useState(1);

  const handleSubmit =  () => {
    const ItemCart:ItemShopCart = {
      product :{
        id: product.id,
        name: product.name,
        price: product.price,
        image: {
          src:product.images[0].url,
          alt:product.images[0].alt
        },
        size: selectedSize
      },
      quantity: qtyProduct
    }


    const cartStorage = localStorage.getItem('cart');
    var actualCart:ItemShopCart[] = [];
    if(cartStorage != null){
      actualCart = JSON.parse(cartStorage);
    }
    if(actualCart){
      actualCart.push(ItemCart);
      localStorage.setItem('cart',JSON.stringify(actualCart));
    }else{
      localStorage.setItem('cart',JSON.stringify([ItemCart]));
    }
  };

  return (
    <div className="blue-green-gradient">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb:any,index:number) => (
              <li key={"Breadcrumb_"+index}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-fourth hover:text-primary">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-fourth"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-fourth hover:text-primary">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[0].url}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            {product.images[1] != null && product.images[2] != null && (
              <>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[1].url}
                  alt={product.images[1].alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[2].url}
                  alt={product.images[2].alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              </>
            )}
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            {product.images[3] != null ?
              <>
              <img
                src={product.images[3].url}
                alt={product.images[3].alt}
                className="h-full w-full object-cover object-center"
              />
              </>
            :
              <>
                <img
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  className="block lg:hidden h-full w-full object-cover object-center"
                />
              </>
            }
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-fourth">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Información de Producto</h2>
            <p className="text-3xl tracking-tight text-fourth">{"PEN "+product.price}</p>

            <div className="mt-10">

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Tamaño</h3>
                  <a href="#" className="text-sm font-medium text-secondary hover:text-primary">
                    Tamaños 
                  </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only"> Escoge una Talla </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size:any) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-secondary text-primary shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-fourth' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-fourth focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-fourth' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className ="flex flex-row items-center justify-between my-4 gap-2">
                <div className="w-full p-2 rounded-md bg-white" placeholder="Cantidad">{qtyProduct}</div>
                <button className="bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-primary" onClick={() => setQtyProduct(prevQtyProduct => prevQtyProduct + 1)}>
                    +
                  </button>
                <button className="bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-primary" onClick={() => setQtyProduct(prevQtyProduct => prevQtyProduct > 1 ? prevQtyProduct- 1 : prevQtyProduct)}>
                    -
                  </button>
              </div>

              <Button
                onClick={()=>handleSubmit()}
                size="lg"
                className="w-full"
                variant="dark"
              >
                Agregar al Carrito 
              </Button>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-secondary">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-fourth">Caracteristicas</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight:any) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-fourth">Detalles</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
