import { Fragment, useState,useEffect, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {X} from 'lucide-react';
import {ItemShopCart} from '../../interfaces/global';

interface PropShoppingCart {
  isOpen: boolean;
  closeShoppingCart: () => void;
}

export default function ShoppingCartComp(propShoppingCart:PropShoppingCart) {

  const { isOpen, closeShoppingCart } = propShoppingCart;
  const [cart, setCart] = useState<ItemShopCart[]>([]);
  const [total, setTotal] = useState<number>(0);


  useEffect(()=>{
    var cartStorage = localStorage.getItem('cart');
    if(cartStorage){
      setCart(JSON.parse(cartStorage));
    }
  },[isOpen])

  useEffect(() => {
    let total = 0
    cart.forEach(item => {
      total += item.product.price* item.quantity;
    })
    setTotal(total)
  }, [cart])


  const removeFromCart = useCallback((productId:number) => {
    if(cart && cart.length > 0){
      var cartFiltered = cart.filter((item)=> item.product.id !== productId); 
      localStorage.setItem('cart',JSON.stringify(cartFiltered));
      setCart(cartFiltered);
    }
  }, [cart])


  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[40]" onClose={closeShoppingCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll red-orange-gradient shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-secondary">Carrito de Compras</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-secondary hover:text-secondary"
                            onClick={() => closeShoppingCart()}
                          >
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-tertiary">
                            {cart?.map((item) => (
                              <li key={item.product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.product.image.src}
                                    alt={item.product.image.alt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-tertiary">
                                      <h3>
                                        <p>{item.product.name}</p>
                                      </h3>
                                      <p className="ml-4">{item.product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-secondary">{"Talla: "+ item.product.size}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Cant. {item.quantity}</p>

                                    <div className="flex">
                                      <button
                                        onClick={(() => removeFromCart(item.product.id))}
                                        type="button"
                                        className="font-medium text-tertiary hover:text-secondary"
                                      >
                                        Borrar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-tertiary">
                        <p>Subtotal</p>
                        <p>{total} PEN</p>
                      </div>
                      <p className="mt-0.5 text-sm text-tertiary">Envio e Impuestos calculados al Pagar.</p>
                      <div className="mt-6">
                        <a
                          href="/store/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent blue-green-gradient px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Ir a Pagar
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm blue-text-gradient ">
                        <p>
                          {'o '}
                          <button
                            type="button"
                            className="font-medium blue-text-gradient hover:text-indigo-500"
                            onClick={() => closeShoppingCart()}
                          >
                            Continuar Comprando 
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
