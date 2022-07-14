import React from 'react';

const Results = ({ children }) => {
  return (
    <section className="container lg mt-20 p-5">
        <div className="bg-[#10455a] p-5 rounded-lg grid grid-cols-1 md:grid-cols-6">
          {children}  
        </div>
    </section>
  )
}

export default Results
