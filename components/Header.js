import React from 'react';
import Image from 'next/image';
import Logo from '../public/logo.png';

const Header = () => {
  return (
    <header className="lg:col-span-5 p-10 grid grid-flow-col grid-cols-1 lg:grid-cols-5">
      <div className="lg:col-start-1 lg:col-end-3 ">
        <Image src={Logo} />

      </div>
    </header>
  )
}

export default Header;