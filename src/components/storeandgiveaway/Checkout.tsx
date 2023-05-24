import { useState } from 'react'
import { CheckCircle,XCircle } from 'lucide-react'
import { RadioGroup } from '@headlessui/react'
import { styles } from "../../styles";


function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CheckoutStore() {

  const [selectedShippment, setSelectedShippment] = useState("Takeout");

  const user = {};

  const [Billing,setBilling] = useState('ticket');

  const handleChange = (event:any) => {
    setBilling(event.target.value);
  };

  return (
    <div className={`${styles.padding} blue-green-gradient w-full h-full`}>
      <div className={`red-orange-gradient rounded-md flex flex-col md:flex-row h-full w-full`}>

        {/* Checkout Form */}
        <div className="flex flex-col h-full pt-2 sm:pt-8 px-4 sm:px-8 pb-2 md:p-8 w-full md:w-1/2">
            <div className="mt-10 flex flex-col w-full w-full">
              <ul role="list" className="-my-6 divide-y divide-lime-600 w-full mb-8">
                {user != null ?
                <li key="Contact Information" className="flex flex-col w-full py-6 gap-3">
                  <h2 className={`${styles.heroSubText} text-[24px]`}>Información de Pago</h2>
                  <div className="flex flex-row w-full gap-2">
                    <label htmlFor="ticket" className="text-medium font-bold text-secondary">Boleta</label><br />
                    <input
                      type="radio"
                      id="ticket"
                      name="ticket"
                      value="ticket"
                      defaultChecked={Billing === 'ticket'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor="invoice" className="text-medium font-bold text-secondary">Factura</label><br />
                    <input
                      type="radio"
                      id="invoice"
                      name="invoice"
                      value="invoice"
                      defaultChecked={Billing === 'invoice'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                  </div>
                  <label htmlFor="name" className="w-full text-secondary text-sm lg:text-lg">Nombre en la Boleta/Factura</label>
                  <input type="text" name="name" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"/>

                  <label htmlFor="billing-document" className="w-full text-secondary text-sm lg:text-lg">Ingresa tu DNI o RUC (si deseas factura)</label>
                  <input type="billing-document" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6" />
                </li>
                :
                <li key="Contact Information" className="flex flex-col w-full py-6 gap-3">
                  <h2 className="text-secondary text-small ">Inicia Sesión para poder realizar tu compra</h2>

                  <a 
                    href="/sign-in"
                    className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[12rem] rounded-lg font-medium bg-tertiary text-primary align-middle hover:bg-lime-100 hover:text-tertiary focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-md"> 
                      Iniciar Sesión 
                  </a>
                  <h2 className="text-secondary text-small">¿Aun no tienes una cuenta?</h2>
                  <a 
                    href="/register"
                    className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[12rem] rounded-lg font-medium bg-tertiary text-primary align-middle hover:bg-lime-100 hover:text-tertiary focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-md"> 
                      Registrate
                  </a>
                </li>
                }
                <li key="Shippment" className="flex flex-col w-full py-2 gap-3">

                  {/* Shipping */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <h2 className={`${styles.heroSubText} text-[24px]`}>Metodo de Envio</h2>
                    </div>

                    <RadioGroup value={selectedShippment} onChange={setSelectedShippment} className="mt-4">
                      <RadioGroup.Label className="sr-only"> Escoge un tipo de Delivery </RadioGroup.Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <RadioGroup.Option
                            key="Takeout"
                            value="Takeout"
                            defaultChecked={selectedShippment === 'Takeout'}
                            className={() =>
                              classNames(
                                selectedShippment === 'Takeout' ? 'ring-2 ring-secondary' : '',
                                'cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border py-1-5 px-4 text-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                              )
                            }
                          >

                            {({ active }) => (
                              <div className="relative top-0 left-0 w-full h-full flex flex-col">
                                <p className="w-full h-auto flex flex-row justify-end">
                                  <CheckCircle className={classNames(active ? 'block' : 'hidden','relative text-secondary text-2xl bg-white')} /> 
                                </p>
                                <p className="font-medium font-bold text-secondary">Recojo en Tienda</p>
                                <p className="text-gray-900 font-small">Inmediato</p>
                                <p className="font-medium">PEN 0.00</p>
                                <p className="font-medium">Av Lima 1285 Urb. Pando, San Miguel</p>
                              </div>
                            )}
                          </RadioGroup.Option>

                          <RadioGroup.Option
                            key="Delivery"
                            value="Delivery"
                            defaultChecked={selectedShippment === 'Delivery'}
                            className={() =>
                              classNames(
                                selectedShippment === 'Delivery' ? 'ring-2 ring-secondary' : '',
                                'cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border py-1.5 px-4 text-sm font-medium hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                              )
                            }
                          >

                            {({ active }) => (
                            <div className="relative top-0 left-0 w-full h-full flex flex-col">
                              <p className="w-full h-auto flex flex-row justify-end">
                                <CheckCircle className={classNames(active ? 'block' : 'hidden','relative text-secondary text-2xl bg-white')} /> 
                              </p>
                              <p className="font-medium font-bold text-secondary">Envio a Domicilio</p>
                              <p className="text-gray-900 font-small">2 a 3 dias</p>
                              <p className="font-medium">PEN 10.00</p>
                            </div>
                            )}
                          </RadioGroup.Option>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="mt-5 flex flex-col gap-2">
                    {selectedShippment === 'Delivery' ?
                      <>
                        <p className="font-bold text-primary text-sm">Ingresa a la Dirección que deseas que te llegue</p>
                        <label htmlFor="address" className="w-full text-secondary font-bold text-sm lg:text-lg">Dirección</label>
                        <input type="text" name="address" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6" />

                        <label htmlFor="shipment-adressDetail" className="w-full text-secondary font-bold">Departamento, Habitacion, etc.</label>
                        <input type="text" name="shipment-adressDetail" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6" />

                        <p className="text-sm font-bold text-primary mt-2">Ingresa el numero de DNI/DOCUMENTO de la persona a recibir el envio.</p>
                        <label htmlFor="shipment-document" className="w-full text-secondary font-bold text-sm lg:text-lg">DNI/Documento</label>
                        <input type="text" name="shipment-document" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"/>
                        <label htmlFor="shipment-name" className="w-full text-secondary font-bold text-sm lg:text-lg">Nombre de la persona</label>
                        <input type="text" name="shipment-name" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6" />

                      </>
                    :
                      <></>
                    }
                  </div>
                </li>
                <li key="Payment" className="flex flex-col w-full py-2">
                  <div className="mt-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h2 className={`${styles.heroSubText} text-[24px]`}>Metodo de Pago</h2>
                    </div>
                      <label htmlFor="card-number" className="w-full text-secondary font-bold">Numero de Tarjeta</label>
                      <input type="card-number" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6" />
                      <label htmlFor="card-name" className="w-full text-secondary font-bold">Nombre en la Tarjeta</label>
                      <input type="card-name" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6" />
                      <p className="font-bold text-secondary mt-2">Fecha de Expiración</p>
                      <div className="w-full flex flex-row mt-2">
                        <div className="w-1/3 mr-2">
                          <label htmlFor="card-expireDate-Month" className="w-full text-secondary font-bold">(MM)</label>
                          <input type="number" name="card-expireDate-Month" className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <div className="w-1/3 mr-2">
                          <label htmlFor="card-expireDate-Year" className="w-full text-secondary font-bold">(YY)</label>
                          <input type="number" name="card-expireDate-Year" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <div className="w-1/3">
                          <label htmlFor="card-CVV" className="w-full text-secondary font-bold">CVV</label>
                          <input type="password" name="card-CVV" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-lime-300  focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Checkout Form */}
        <div className="flex flex-col h-full px-4 sm:px-8 pb-8 pt-2 md:p-8  w-full md:w-1/2">
          <div className="md:mt-10 flex flex-col w-full w-full">
                <div className="mt-5 flex flex-col gap-3">
                  <h2 className={`${styles.heroSubText} text-[24px]`}>Resumen de Orden</h2>
                </div>
                <ul role="list" className="my-6 divide-y divide-lime-600 w-full mb-8">
                  <li key="Order-Summary" className="flex flex-col w-full bg-primary rounded-md p-4 my-4">
                    <div className="flex flex-row justify-between w-full">

                      <div className="flex flex-col">
                        <img src={"#"} alt={"hola"} className="w-20 h-20 object-cover" />
                      </div>

                      <div className="flex flex-col">
                        <h3 className="text-lg font-bold">{"hola"}</h3>
                        <p className="text-sm text-gray-500">{"hola"}</p>
                        <p className="text-sm text-gray-500">{"hola"}</p>
                      </div>

                      <div className="flex flex-col justify-between items-end">
                        <XCircle className="text-2xl text-gray-500 cursor-pointer" />
                        <select name="quantity" id="quantity" className="w-20 h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-600 focus:border-lime-600">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                    </div>
                  </li>
                  <li key="Order-Payment-Detail" className="flex flex-col w-full bg-primary rounded-md p-4 my-4 gap-2 divide-y divide-gray-400">
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-md text-secondary font-bold">SubTotal</p>
                      <p className="text-lg text-secondary font-bold">PEN 200</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-md text-secondary font-bold">Envio</p>
                      <p className="text-lg text-secondary font-bold">PEN 20</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-md text-secondary font-bold">Impuestos</p>
                      <p className="text-lg text-secondary font-bold">PEN 30</p>
                    </div>
                    <div className="flex flex-row justify-between items-center py-4">
                      <p className="text-2xl text-white font-bold">Total</p>
                      <p className="text-2xl text-white font-bold">PEN 250</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <button
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent blue-green-gradient px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Pagar 
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
  )
}
