import React from 'react';
import moment from 'moment';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { 
    dateTime,
    timeConvert
} from '../utils/datetime-utils';

export const OneWay = ({data}) => (data.map(({leg, fare}, key) => {
    return (
        <section key={key} className="bg-[#10455a] p-5 rounded-lg grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-0 gap-y-20 lg:gap-5 lg:gap-y-0">
            <section className="p-5 bg-[#F4EBD0] text-zinc-700 border-dashed border-4 border-black rounded-lg">
                <div className="grid grid-cols-4">
                    <ul>
                        {leg.airlineCodes.map((airlineCode, index) =>
                            <li className="font-bold text-2xl" key={index}>{airlineCode}</li>
                        )}
                    </ul>
                    <div className="text-right col-start-3 col-end-5">
                        <p className="font-bold text-4xl lg:text-2xl line-through">${fare.price.amount}.00</p>
                        <p className="text-xl">$5.00</p>
                    </div>
                    <div className="col-span-4">
                        {leg.segments.map((segment, index) =>
                            <div key={index}>
                                <p className="font-bold mt-8">{segment.designatorCode}</p>
                                <p className="font-bold mb-5">Duration: <span className="font-normal">{timeConvert(segment.durationMinutes)}</span></p>
                                <p className="font-bold">Departure: <span className="font-normal">{segment.departureAirportCode}</span></p>                                
                                <p className="font-bold">Arrival: <span className="font-normal">{segment.arrivalAirportCode}</span></p>
                            </div> 
                        )}
                    </div>
                </div>
            </section>
            <section className="flex justify-evenly items-center text-center sm:text-3xl text-white">
                <div className="text-xl">
                    <p>{moment(new Date(leg.departureDateTime).toDateString()).format('MMM Do')}</p>
                    <p>{moment(leg.departureDateTime).format('h:mm a')}</p>
                    <p className="text-6xl">{leg.departureAirportCode}</p>
                </div>
                <div>
                    <ArrowRightIcon className="h-10 sm:h-12" />
                </div>
                <div className="text-xl">
                    <p>{moment(new Date(leg.arrivalDateTime).toDateString()).format('MMM Do')}</p>
                    <p>{moment(leg.arrivalDateTime).format('h:mm a')}</p>
                    <p className="text-6xl">{leg.arrivalAirportCode}</p>
                </div>
            </section>
            <section class="flex items-center">
                <button type="submit" class="px-5 py-3 text-white bg-[#06202A] rounded-lg w-[100%] hover:shadow-2xl"><span class="font-medium">$5.00</span></button>
            </section>
        </section>
    )
}));

export default OneWay;