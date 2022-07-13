import React from 'react'

const Masthead = ({ children, colSize }) => {
  return (
    <section className={`lg:col-span-${colSize} p-5 border-solid border-2 border-blue-600 text-white`}>
        {children}
    </section>
  )
}

export default Masthead
