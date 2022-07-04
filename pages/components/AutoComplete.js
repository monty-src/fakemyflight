import React, { useState, useRef, useEffect, Children } from 'react';
import classNames from 'classnames';

const AutoComplete = () => {
    const ref = useRef();
    const listRef = useRef();
    const [value, setValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [select, setSelect] = useState(-1);

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
        setIsMenuOpen(false);
    };

    const count = 0;

    const keyDown = e => {
      switch(e.key) {
        case 'ArrowDown':
          if (isMenuOpen) {
            if ( parseInt(select) === listRef.current.childNodes.length ) {
              setSelect(parseInt(0));
              return;
            }
            setSelect(parseInt(select) + 1);
          }
          console.log('select: ', select);
          break;
          case 'ArrowUp':
            if ( parseInt(select) === 2) {
              setSelect(parseInt(listRef.current.childNodes.length));
              return;
            } else if (parseInt(select) === -1) {
              return;
            }
            setSelect(parseInt(select) - 1);
            console.log('select: ', select);
          break;
          case 'Enter':
            console.log('enter');
            break;
        default:
          return;
      }
    }

    useEffect(() => {
      const checkIfClickedOutside = e => {
        if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
          setIsMenuOpen(false)
        }
      }
      document.addEventListener('mousedown', checkIfClickedOutside);
      return () => {
        document.removeEventListener('mousedown', checkIfClickedOutside);
      }
    }, [isMenuOpen]);

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
              <div className="absolute z-10 bg-white w-full" ref={listRef}>
                <div
                  tabIndex="0"
                  onClick={onClick} 
                  className="border-b-2 p-2 border-gray-200 cursor-pointer">
                  Apple
                </div>
                <div
                  tabIndex="0"
                  onClick={onClick}  
                  className="border-b-2 p-2 border-gray-200 cursor-pointer">
                  Banana
                </div>
              </div>}
        </div>
    )
}

export default AutoComplete;