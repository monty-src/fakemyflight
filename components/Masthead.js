import React from 'react';

const Masthead = ({ children, colSize }) => {
  return (
    <section className={`lg:col-span-${colSize} text-white`}>
      {children}
    </section>
  );
};

export default Masthead;
