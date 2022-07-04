import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import AutoComplete from './AutoComplete';


const Form = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [radio, setRadio] = useState(0);
    const [fromOptions, setFromOptions] = useState({});

    const whenInput = (radio === 0) ? classNames('hidden') : classNames('opacity-100');
    const datePickerGrid = (radio === 0) ? classNames('sm:grid-cols-1') : classNames('sm:grid-cols-2');

    useEffect(() => {

        // const options = {
        //     method: 'GET',
        //     url: 'https://aerodatabox.p.rapidapi.com/airports/iata/LAX',
        //     headers: {
        //       'X-RapidAPI-Key': process.env.API_KEY,
        //       'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        //     }
        //   };
          
        //   axios.request(options).then(function (response) {
        //       console.log(response.data);
        //   }).catch(function (error) {
        //       console.error(error);
        //   });
    })

    
    return (
        <div className="space-y-4">
            <div className="flex">
                <div className="form-check mr-10">
                    <input checked={radio === 0} onChange={() => setRadio(0)} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1"> One way </label>
                </div>
            <div className="form-check">
                <input checked={radio === 1} onChange={() => setRadio(1)} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2"> Round Trip </label>
            </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AutoComplete />
                <AutoComplete />
            </div>

            <div className={`grid grid-cols-1 gap-4 ${datePickerGrid}`}>
                <div>
                    <label className="sr-only" htmlFor="name">When</label>
                    <DatePicker 
                        className="w-full p-3 text-sm border-gray-200 rounded-lg"
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)} />
                </div>

                <div className={whenInput}>
                    <label className="sr-only" htmlFor="name">Return</label>
                    <DatePicker 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)} 
                        className={`w-full p-3 text-sm border-gray-200 rounded-lg`}/>
                </div>
            </div>

            <div className="mt-4">
                <button
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