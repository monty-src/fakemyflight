import React from 'react';

export const Person = ({idx, adult}) => {
  return (
        <>
            <p>{adult === 0 ? 'Adult' : 'Child'} {idx+1}</p>
            <div className="grid grid-rows-1 gap-5">
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="sr-only" htmlFor="firstName">First Name</label>
                        <input 
                            type="text"
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
                            id="firstName"/>
                    </div>
                    <div>
                        <label className="sr-only" htmlFor="lastName">Last Name</label>
                        <input 
                            type="text"
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
                            id="lastName"/>
                    </div>
                </div>
            </div>
            <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input 
                    type="email"
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
                    id="email"/>
            </div>
        </>  
    )   
}

export default Person;
