import React from 'react';
import moment from 'moment';
import { timeConvert } from '../utils/datetime-utils';

export const OneWay = ({data}) => (data.map((flight, key) => {

    console.log('flight: ', flight);
    const {leg, fare} = flight; 

    return (
        <section key={key} className="bg-[#10455a] p-5 rounded-lg grid grid-cols-1 lg:grid-cols-6 gap-5">
            <section className="lg:col-span-2 p-5 bg-[#F4EBD0] text-zinc-700 border-dashed border-4 border-black rounded-lg">
                <div className="grid grid-cols-4 gap-x-5 ">
                    <ul>
                        {leg.airlineCodes.map((airlineCode, index) =>
                            <li className="font-bold text-2xl" key={index}>{airlineCode}</li>
                        )}
                    </ul>
                    <div className="text-right col-start-3 col-end-5">
                        <p className="font-bold text-4xl lg:text-2xl line-through">${fare.price.amount}.00</p>
                        <p className="text-xl">$5.00</p>
                    </div>
                    <div className="col-start-1 col-end-4">
                        {leg.segments.map((segment, index) =>
                            <div key={index}>
                                <p className="font-bold mt-5">{segment.designatorCode}</p>
                                <p className="font-bold">Duration: <span className="font-normal">{timeConvert(segment.durationMinutes)}</span></p>
                                <p className="mt-2 font-bold">Departure: <span className="font-normal">{segment.departureAirportCode}</span></p>
                                <p className="font-bold">Date &amp; Time:  <span className="font-normal"> {moment(new Date(segment.departureDateTime).toDateString()).format('MMMM Do, YYYY')} {moment(segment.departureDateTime).format('h:mm a')} </span> </p>

                                <p className="mt-2 font-bold">Arrival: <span className="font-normal">{segment.arrivalAirportCode}</span></p>
                                <p className="font-bold">Date &amp; Time:  <span className="font-normal"> {moment(new Date(segment.arrivalDateTime).toDateString()).format('MMMM Do, YYYY')} {moment(segment.arrivalDateTime).format('h:mm a')} </span> </p>
                            </div> 
                        )}
                    </div>
                </div>
                {/* <p className="text-right text-3xl font-bold line-through">${fare.price.amount}.00</p>
                <p className="text-right text-2xl mt-2">$5.00</p>
                <div className="flex mt-5">
                    <p className="font-bold text-xl">Departure:</p>
                    <p></p>

                </div> */}
            </section>
            <section className="lg:col-span-3">two</section>
            <section className="lg:col-span-1">three</section>
        </section>
    )
}));

export default OneWay;