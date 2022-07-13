import React, { useState, useRef, useEffect, Children } from 'react';
import axios from 'axios';

const AutoComplete = ({ label, setAirport }) => {
    const ref = useRef();
    const listRef = useRef();
    const [value, setValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [select, setSelect] = useState(-1);
    const [options, setOptions] = useState([]);

    const onChange = e => {
        if (e.target.value === '') {
          setIsMenuOpen(false);
          setValue('');
          setAirport('');
          return;
        }
        setValue(e.target.value);
        setAirport(e.target.value);
        setOptions([]);
        setIsMenuOpen(true);
    };

    const onClick = e => {
        setValue(e.target.textContent.trim());
        setAirport(e.target.textContent.trim());
        setIsMenuOpen(false);
    };
    
    const keyDown = e => {
      const childrenLength = isMenuOpen && parseInt(listRef.current.childNodes.length) - 1;
      switch(e.key) {
        case 'ArrowDown':
          if (isMenuOpen) {
            if (childrenLength === parseInt(select)) {
              setSelect(0);
              return false;
            }
            setSelect(parseInt(select) + 1);
          }
          break;
          case 'ArrowUp':
            if ( parseInt(select) <= 0) {
              setSelect(childrenLength);
              return false;
            }
            setSelect(parseInt(select) - 1);
          break;
          case 'Enter':
            listRef.current.childNodes[select].click();
            setOptions([]);
            break;
          case 'Tab' || 'Shift':
            setIsMenuOpen(false);
            setOptions([]);
            return;
        default:
            setSelect(-1);
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

    useEffect(() => {
        if(value) {
            const configuration = {
                method: 'GET',
                url: `api/airports/${value}`,
                headers: {
                    'X-RapidAPI-Key': process.env.API_KEY,
                    'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
                }
            };
          
            axios.request(configuration).then(function (response) {
                if (response.data.name !== null) {
                    setOptions([
                        `${response.data.code} - ${response.data.name}`
                    ]);
                    return false;
                }
                setOptions([ 'No results found' ]);
          }).catch(function (error) {
                setOptions([ 'No results found' ]);
          });
        }
    }, [value]);

    return (
        <div className="relative col-span-6 sm:col-span-3" ref={ref}>
          <label className="sr-only" htmlFor="name">{label}</label>
          <input 
            autoComplete="off"
            onChange={onChange}
            onKeyDown={keyDown}
            value={value}
            type="text"
            placeholder={label}
            className={`
              py-3
              sm:text-md 
              placeholder-opacity-50 
              placeholder-white 
              border-none 
              bg-[#10455a] 
              text-white 
              pl-4 
              pr-4 
              rounded-xl 
              w-full
              ${isMenuOpen && `rounded-t-xl rounded-b-none ring-transparent`}
              focus:ring-transparent`}
            id={`${label}Airport`}/>
            {isMenuOpen &&  
              <div className="absolute z-10 w-full" ref={listRef}>
                {options.map((option, idx) => 
                  <div
                    key={idx}
                    onClick={onClick} 
                    className={`
                      pt-4
                      pb-4
                      p-2
                      rounded-b-xl
                      text-white
                      text-xs
                      cursor-pointer
                      bg-[#10455a]
                      hover:bg-[#0b2d3b]
                      ${(idx === select) ? 'bg-[#0b2d3b]' : ''}`}>
                    {option}
                  </div>
                )}         
              </div>}
        </div>
    )
}

export default AutoComplete;