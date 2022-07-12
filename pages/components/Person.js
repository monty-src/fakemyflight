import React from 'react';
import { ArrowRightIcon, PlusIcon, MinusIcon } from '@heroicons/react/outline';

export const Person = ({
    idx,
    label,
    handleFormCheckoutValues
}) => {

    const lowerCaseLabel = label.toLowerCase();

  return (
        <>
            <p>{label} {idx + 1}</p>
            <div className="grid grid-rows-1 gap-5">
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="sr-only" htmlFor="firstName">First Name</label>
                        <input 
                            type="text"
                            name="firstName"
                            autoComplete='off'
                            placeholder="First Name"
                            className="
                            p-2
                            pl-4
                            text-sm
                            sm:text-md 
                            placeholder-opacity-50
                            placeholder-black 
                            border-none 
                            bg-[#c4b589]
                            text-black 
                            rounded-xl 
                            focus:ring-transparent
                            w-full"
                            id="firstName"
                            onChange={e => handleFormCheckoutValues(idx, lowerCaseLabel, e)} />
                    </div>
                    <div>
                        <label className="sr-only" htmlFor="lastName">Last Name</label>
                        <input 
                            type="text"
                            name="lastName"
                            autoComplete='off'
                            placeholder="Last Name"
                            className="
                            p-2
                            pl-4
                            text-sm
                            sm:text-md 
                            placeholder-opacity-50
                            placeholder-black 
                            border-none 
                            bg-[#c4b589]
                            text-black 
                            rounded-xl 
                            focus:ring-transparent
                            w-full"
                            id="lastName"
                            onChange={e => handleFormCheckoutValues(idx, lowerCaseLabel, e)} />
                    </div>
                </div>
            </div>
            {/* <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="
                    p-2
                    pl-4
                    text-sm
                    placeholder-black 
                    border-none 
                    bg-[#c4b589]
                    text-black 
                    placeholder-opacity-50
                    rounded-xl 
                    focus:ring-transparent
                    w-full"
                    id="email"
                    onChange={e => handleFormCheckoutValues(idx, lowerCaseLabel, e)} />
            </div> */}
        </>  
    )   
}

export default Person;
