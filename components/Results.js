import React from 'react';

import Checkout from './Checkout';

const Results = ({ children}) => {
  return (
    <section className="container lg my-20 p-5 grid gap-y-20">
      {children}
    </section>
  )
}

export default Results
