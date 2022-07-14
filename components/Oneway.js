import React from 'react';

export const OneWay = ({data}, key) => {
    return (data.map(flight => (
        <section className="bg-[#10455a] p-5 rounded-lg grid grid-cols-1 lg:grid-cols-6 gap-5">
            <section className="lg:col-span-2 p-5 bg-[#F4EBD0] text-zinc-700 border-dashed border-4 border-black rounded-lg">one</section>
            <section className="lg:col-span-3">two</section>
            <section className="lg:col-span-1">three</section>
        </section>
    )))
}

export default OneWay;