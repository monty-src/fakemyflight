import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/outline';

import Checkout from './Checkout';

export const OneWay = ({
  data,
  email,
  payment,
  setEmail,
  totalPrice,
  toggleHide,
  addFormFields,
  handleCheckout,
  removeFormFields,
  handleFormCheckoutValues,
  formAdultsCheckoutValues,
  formChildrenCheckoutValues,
}) =>
  data.map(({ leg, fare }, key) => {
    return (
      <section key={key} className="mb-10">
        <section className="bg-[#10455a] p-5 rounded-lg grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-0 gap-y-20 lg:gap-5 lg:gap-y-0">
          <section className="p-5 bg-[#F4EBD0] text-zinc-700 border-dashed border-4 border-black rounded-lg">
            <div className="grid grid-cols-4">
              <ul className="col-start-1 col-end-3">
                {leg.segments.map(({ designatorCode }, index) => (
                  <li className="font-bold text-base" key={index}>
                    {designatorCode}
                  </li>
                ))}
              </ul>
              <div className="text-right col-start-3 col-end-5">
                <p className="font-bold text-4xl lg:text-2xl line-through">
                  {fare.amount}
                </p>
                <p className="text-xl">$5.00</p>
              </div>
              <div className="col-span-4">
                {leg.segments.map((segment, index) => (
                  <div key={index}>
                    <p className="font-bold mt-5">{segment.designatorCode}</p>
                    <p className="font-bold">
                      Duration:{' '}
                      <span className="font-normal">{segment.duration}</span>
                    </p>
                    <p className="font-bold mt-2">
                      Departure:{' '}
                      <span className="font-normal">
                        {segment.departureAirportCode}
                      </span>
                    </p>
                    <p>{segment.departureAirport}</p>
                    <p className="font-bold mt-2">
                      Arrival:{' '}
                      <span className="font-normal">
                        {segment.arrivalAirportCode}
                      </span>
                    </p>
                    <p>{segment.arrivalAirport}</p>
                    {segment.stopoverDurationMinutes !== 0 && (
                      <p className="mt-5 mb-2 font-bold">
                        Layover Time:{' '}
                        <span className="font-normal">{segment.stopOver}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="flex justify-evenly items-center text-center sm:text-3xl text-white">
            <div className="text-xl">
              <p>{leg.departureDate}</p>
              <p>{leg.departureTime}</p>
              <p className="text-6xl">{leg.departureAirportCode}</p>
            </div>
            <div>
              <ArrowRightIcon className="h-16 sm:h-20" />
            </div>
            <div className="text-xl">
              <p>{leg.arrivalDate}</p>
              <p>{leg.arrivalTime}</p>
              <p className="text-6xl">{leg.arrivalAirportCode}</p>
            </div>
          </section>
          <section className="flex items-center">
            <button
              onClick={(e) => toggleHide(key)}
              type="submit"
              className="px-5 py-3 text-white bg-[#06202A] rounded-lg w-[100%] hover:shadow-xl"
            >
              <span className="font-medium">$5.00</span>
            </button>
          </section>
        </section>
        <div
          className={`bg-[#F4EBD0] p-8 border-dashed border-4 border-t-0 border-black ${
            !payment[key] && 'hidden'
          }`}
        >
          <div className="grid grid-cols-1">
            <div className="grid gap-y-5">
              <Checkout
                email={email}
                setEmail={setEmail}
                totalPrice={totalPrice}
                handleCheckout={handleCheckout}
                addFormFields={addFormFields}
                removeFormFields={removeFormFields}
                handleFormCheckoutValues={handleFormCheckoutValues}
                formAdultsCheckoutValues={formAdultsCheckoutValues}
                formChildrenCheckoutValues={formChildrenCheckoutValues}
              />
            </div>
          </div>
        </div>
      </section>
    );
  });

export default OneWay;
