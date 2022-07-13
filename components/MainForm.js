import React, { useState } from 'react';
import classNames from 'classnames';

import FlightType from './FlightType';
import DatePickers from './DatePickers';
import AutoComplete from './AutoComplete';

const MainForm = () => {

    const [radio, setRadio] = useState(0);
    const [toDate, setToDate] = useState('');
    const [toAirport, setToAirport] = useState('');
    const [fromAirport, setFromAirport] = useState('');
    const [fromDate, setFromDate] = useState(new Date());

    const onSubmit = async () => {

        const response = await axios.post('http://localhost:3000/api/airports/flights', {
            fromDate,
            toDate,
            radio,
            fromAirport,
            toAirport
        });

        setFlights(response.data);
        
    };

    return (
        <section className="grid grid-cols-6 gap-5">
            <FlightType radio={radio} setRadio={setRadio} />
            
            <p className="col-span-6">Route</p>
            <AutoComplete label="Form" />
            <AutoComplete label="To" />
            
            <p className="col-span-6">Date</p>
            <DatePickers
                toDate={toDate}
                fromDate={fromDate}
                setToDate={setToDate}
                setFromDate={setFromDate}
                leaveClasses={`col-span-6 ${radio === 0 ? 'col-span-6' : 'sm:col-span-3'}`}
                returnClasses={`${(radio === 0) ? 'hidden' : 'opacity-100 col-span-6 sm:col-span-3'}`}
            />
            <button className="mt-5 inline-flex items-center justify-center w-full px-3 py-3 text-white bg-[#10455a] rounded-lg sm:w-auto"
                onClick={onSubmit}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>
        </section>
    )
}

export default MainForm;
