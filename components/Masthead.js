import React from 'react'

const Masthead = ({ children, colSize }) => {
  return (
    <section className={`lg:col-span-${colSize} bg-blue-200 border-solid border-2 border-blue-600`}>
        {children}
    </section>
  )
}

export default Masthead
