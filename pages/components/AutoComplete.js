import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

const AutoComplete = () => {
    const ref = useRef();
    const [value, setValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const onChange = e => {
        if (e.target.value === '') {
          setIsMenuOpen(false);
          setValue('');
          return;
        }
        setValue(e.target.value);
        setIsMenuOpen(true);
    };

    const onClick = e => {
        console.log('current target: ', e.target.textContent.trim());
        setValue(e.target.textContent.trim());
    };

    const keyDown = e => {
      console.log('key:', e.key);
      if (e.key = 'ArrowDown') {}
      if (e.key = 'ArrowUp') {}
      if (e.key = 'Enter') {}
    }

    useEffect(() => {
      const checkIfClickedOutside = e => {
        if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
          setIsMenuOpen(false)
        }
      }
  
      document.addEventListener("mousedown", checkIfClickedOutside)
  
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside)
      }
    }, [isMenuOpen])

    return (
        <div className="relative" ref={ref}>
          <label className="sr-only" htmlFor="name">From</label>
          <input 
            autoComplete="off"
            onChange={onChange}
            onKeyDown={keyDown}
            value={value}
            type="text"
            placeholder="From"
            className="w-full p-3 text-sm border-gray-200 rounded-lg" 
            id="fromAirport"/>
            {isMenuOpen &&
              <div className="absolute z-10 bg-white w-full">
                <div
                  onClick={onClick} 
                  className="border-b-2 p-2 border-gray-200 cursor-pointer">
                  Apple
                </div>
                <div
                  onClick={onClick}  
                  className="border-b-2 p-2 border-gray-200 cursor-pointer">
                  Banana
                </div>
              </div>}
        </div>
    )
}

export default AutoComplete;