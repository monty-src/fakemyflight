import React from 'react'

const FlightType = ({radio, setRadio}) => {
  return (
    <div className="col-span-3">
        <button className={`${radio === 0 && `bg-[#10455a]`} p-3 border-[#10455a] rounded-l-lg border-2`}
            onClick={() => setRadio(0)}>One-Way</button>
        <button className={`${radio === 1 && `bg-[#10455a]`} p-3 border-[#10455a] rounded-r-lg border-t-2 border-b-2 border-r-2`}
            onClick={() => setRadio(1)}>Round Trip</button>
    </div>
  )
}

export default FlightType
