import React from 'react'

const Masthead = ({ children, colSize }) => {
  return (
    <section className={`lg:col-span-${colSize} p-5 text-white`}>
        {children}
    </section>
  )
}

export default Masthead
