import React from 'react';

import Checkout from './Checkout';

const Results = ({ children}) => {
  return (
    <section className="container lg mb-10 p-5 grid gap-y-10">
      {children}
    </section>
  )
}

export default Results
