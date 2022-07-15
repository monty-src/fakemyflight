import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickers = ({
  toDate,
  fromDate,
  setToDate,
  setFromDate,
  leaveClasses,
  returnClasses,
}) => {
  return (
    <>
      <div className={leaveClasses}>
        <DatePicker
          placeholderText="Leave Date"
          className="
                pl-4 
                pr-4
                py-3
                sm:text-md 
                placeholder-white 
                placeholder-opacity-50 
                border-none 
                bg-[#10455a] 
                text-white 
                rounded-xl 
                w-full
                focus:ring-transparent"
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
        />
      </div>
      <div className={returnClasses}>
        <DatePicker
          placeholderText="Return Date"
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
    </>
  );
};

export default DatePickers;
