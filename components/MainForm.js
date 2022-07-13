import React, { useState } from 'react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';

import FlightType from './FlightType';
import AutoComplete from './AutoComplete';
import 'react-datepicker/dist/react-datepicker.css';

const MainForm = () => {

    const [radio, setRadio] = useState(0);
    const [toDate, setToDate] = useState('');
    const [toAirport, setToAirport] = useState('');
    const [fromAirport, setFromAirport] = useState('');
    const [fromDate, setFromDate] = useState(new Date());

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
        <section className="grid grid-cols-6 gap-5">
            <FlightType radio={radio} setRadio={setRadio} />
            <p className="col-span-6">Route</p>
            <AutoComplete label="Form" />
            <AutoComplete label="To" />
            <p className="col-span-6">Date</p>
        </section>
    )
}

export default MainForm;
