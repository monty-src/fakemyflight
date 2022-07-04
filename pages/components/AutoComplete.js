import React, { useState, useRef, useEffect, Children } from 'react';
import classNames from 'classnames';

const AutoComplete = () => {
    const ref = useRef();
    const listRef = useRef();
    const [value, setValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [select, setSelect] = useState(-1);

    const options = [
        'Acerola',
        'Apple',
        'Apricots',
        'Avocado',
        'Banana',
        'Blackberries',
        'Blackcurrant',
        'Blueberries'
    ];

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
            const childrenLength = parseInt(listRef.current.childNodes.length) - 1;
            if (childrenLength === parseInt(select)) {
              setSelect(0);
              return false;
            }
            setSelect(parseInt(select) + 1);
          }
          break;
          case 'ArrowUp':
            const childrenLength = parseInt(listRef.current.childNodes.length) -1;
            if ( parseInt(select) <= 0) {
              setSelect(childrenLength);
              return false;
            }
            setSelect(parseInt(select) - 1);
          break;
          case 'Enter':
            console.log('enter');
            listRef.current.childNodes[select].click();
            break;
        default:
          return;
      }
    };

    useEffect(() => {
      const checkIfClickedOutside = e => {
        if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
          setIsMenuOpen(false);
          setSelect(-1);
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
                {options.map((option, idx) => 
                  <div
                    key={idx}
                    onClick={onClick} 
                    className={`p-2 border-gray-200 cursor-pointer ${(idx === select) ? 'border-blue-500 border-2' : 'border-b-2'}`}>
                    {option}
                  </div>
                )}
                
                
              </div>}
        </div>
    )
}

export default AutoComplete;