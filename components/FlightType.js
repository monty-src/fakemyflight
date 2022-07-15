import React from 'react';

const FlightType = ({ radio, setRadio, resetFlights }) => {
  const handleFlightType = (n) => {
    setRadio(n);
    resetFlights(false);
  };

  return (
    <div className="col-span-4 sm:col-span-3 flex">
      <button
        className={`${
          radio === 0 && `bg-[#10455a]`
        } w-6/12 p-3 border-[#10455a] rounded-l-lg border-2`}
        onClick={() => handleFlightType(0)}
      >
        One-Way
      </button>
      <button
        className={`${
          radio === 1 && `bg-[#10455a]`
        } w-6/12 p-3 border-[#10455a] rounded-r-lg border-t-2 border-b-2 border-r-2`}
        onClick={() => handleFlightType(1)}
      >
        Round Trip
      </button>
    </div>
  );
};

export default FlightType;
