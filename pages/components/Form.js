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
        <div className="space-y-4">
            <div className="flex">
                <div className="form-check mr-10">
                    <input checked={radio === 0} onChange={() => setRadio(0)} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label inline-block text-white" htmlFor="flexRadioDefault1"> One way </label>
                </div>
                <div className="form-check">
                    <input checked={radio === 1} onChange={() => setRadio(1)} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label className="form-check-label inline-block text-white" htmlFor="flexRadioDefault2"> Round Trip </label>
                </div>
            </div>
            <p className="text-2xl text-white">Route</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AutoComplete setAirport={setFromAirport} label="From" />
                <AutoComplete setAirport={setToAirport} label="To" />
            </div>
            <p className="text-2xl text-white">Date</p>
            <div className={`grid grid-cols-1 gap-4 ${datePickerGrid}`}>
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

            <div className="mt-4">
                <button
                    onClick={onSubmit}
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-5 py-3 text-white bg-black rounded-lg sm:w-auto">
                        <span className="font-medium"> Go</span>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 ml-3"
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