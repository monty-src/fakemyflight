import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/outline';

import Person from './Person';

const Checkout = ({
  email,
  setEmail,
  addFormFields,
  handleCheckout,
  removeFormFields,
  handleFormCheckoutValues,
  formAdultsCheckoutValues,
  formChildrenCheckoutValues,
}) => {
  return (
    <>
      <div className="flex flex-row gap-x-3 text-xs">
        <div className="flex">
          <button
            onClick={() =>
              removeFormFields(formAdultsCheckoutValues.length - 1, 'adult')
            }
            className="p-1 px-2 rounded-l-lg bg-white hover:bg-zinc-200"
          >
            <MinusIcon className="h-3" />
          </button>

          <div className="p-1 px-3 bg-[#c4b589]">
            Adults <span>{formAdultsCheckoutValues.length}</span>
          </div>

          <button
            onClick={() => addFormFields('adult')}
            className="p-1 px-2 rounded-r-lg bg-white hover:bg-zinc-200"
          >
            <PlusIcon className="h-3" />
          </button>
        </div>
        <div className="flex">
          <button
            onClick={() =>
              removeFormFields(formChildrenCheckoutValues.length - 1, 'child')
            }
            className="p-1 px-2 rounded-l-lg bg-white hover:bg-zinc-200"
          >
            <MinusIcon className="h-3" />
          </button>

          <div className="p-1 px-3 bg-[#c4b589]">
            Children <span>{formChildrenCheckoutValues.length}</span>
          </div>

          <button
            onClick={() => addFormFields('child')}
            className="p-1 px-2 rounded-r-lg bg-white hover:bg-zinc-200"
          >
            <PlusIcon className="h-3" />
          </button>
        </div>
      </div>
      {formAdultsCheckoutValues.map((adult, key) => (
        <Person
          label="Adult"
          idx={key}
          key={key}
          person={adult}
          length={formAdultsCheckoutValues.length}
          handleFormCheckoutValues={handleFormCheckoutValues}
        />
      ))}
      {formChildrenCheckoutValues.map((child, key) => (
        <Person
          label="Child"
          idx={key}
          key={key}
          person={child}
          length={formChildrenCheckoutValues.length}
          handleFormCheckoutValues={handleFormCheckoutValues}
        />
      ))}
      <div>
        <p className="mb-5 mt-5">E-mail</p>
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          autoComplete="off"
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
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        value={email}
        onClick={handleCheckout}
        className="px-5 py-3 text-white bg-[#06202A] rounded-lg w-[100%] hover:shadow-2xl"
      >
        <span className="font-medium">Purchase</span>
      </button>
    </>
  );
};

export default Checkout;
