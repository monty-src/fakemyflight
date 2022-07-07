import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import AutoComplete from './AutoComplete';


const Form = ({setFlights}) => {

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState('');
    const [radio, setRadio] = useState(0);
    const [fromAirport, setFromAirport] = useState('');
    const [toAirport, setToAirport] = useState('');

    const whenInput = (radio === 0) ? classNames('hidden') : classNames('opacity-100');
    const datePickerGrid = (radio === 0) ? classNames('sm:grid-cols-1') : classNames('sm:grid-cols-2');

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
        <div>
            <div className="md:flex md:items-center mb-5">
                <div className="flex-grow">
                    <div className="flex cursor-pointer w-full">
                        <button 
                            onClick={() => setRadio(0)}
                            className={`border-[#10455a] ${radio === 0 && `bg-[#10455a]`} py-3 px-3 text-white rounded-l-lg border-2 w-full transition-all`}>One-Way</button>
                        <button 
                            onClick={() => setRadio(1)}
                            className={`border-[#10455a] ${radio === 1 && `bg-[#10455a]`} py-3 px-3 text-white rounded-r-lg border-t-2 border-b-2 border-r-2 w-full transition-all`}>Round Trip</button>
                    </div>
                </div>
                <div className="flex-grow invisible md:block hidden">
                    <div className="flex cursor-pointer w-full">
                        <button 
                            onClick={() => setRadio(0)}
                            className={`border-[#10455a] ${radio === 1 && `bg-[#10455a]`} py-3 px-4 text-white rounded-l-lg border-2 w-full transition-all`} >One-Way</button>
                        <button 
                            onClick={() => setRadio(1)}
                            className={`border-[#10455a] ${radio === 1 && `bg-[#10455a]`} py-3 px-4 bg-blue text-white rounded-r-lg border-t-2 border-b-2 border-r-2 w-full transition-all`}>Round Trip</button>
                    </div>
                </div>
            </div>
            <p className="text-2xl text-white mb-2">Route</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-5">
                <AutoComplete setAirport={setFromAirport} label="From" />
                <AutoComplete setAirport={setToAirport} label="To" />
            </div>
            <p className="text-2xl text-white mb-2">Date</p>
            <div className={`grid grid-cols-1 gap-4 ${datePickerGrid} mb-10`}>
                <div>
                    <label className="sr-only" htmlFor="name">When</label>
                    <DatePicker 
                        placeholderText='Leave Date'
                        className="              
                        py-3
                        sm:text-md 
                        placeholder-opacity-50 
                        placeholder-white 
                        border-none 
                        bg-[#10455a] 
                        text-white 
                        pl-4 
                        pr-4 
                        rounded-xl 
                        w-full
                        focus:ring-transparent"
                        selected={fromDate} 
                        onChange={(date) => setFromDate(date)} />
                </div>

                <div className={whenInput}>
                    <label className="sr-only" htmlFor="name">Return</label>
                    <DatePicker
                        placeholderText='Return Date'
                        className="
                        py-3 
                        sm:text-md 
                        placeholder-opacity-50 
                        placeholder-white 
                        border-none 
                        bg-[#10455a] 
                        text-white 
                        pl-4 
                        pr-4 
                        rounded-xl 
                        w-full
                        focus:ring-transparent" 
                        selected={toDate} 
                        onChange={(date) => setToDate(date)} 
                        />
                </div>
            </div>
            <div>
                <button
                    onClick={onSubmit}
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-3 py-3 text-white bg-[#10455a] rounded-lg sm:w-auto">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                </button>
            </div>
      </div>
    )
}

export default Form;