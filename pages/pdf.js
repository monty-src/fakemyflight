import Script from 'next/script';
import React, {useEffect, createRef} from 'react';
import { ArrowRightIcon } from '@heroicons/react/outline';

const pdfPage = () => {
    
    // useEffect(() => {
    //     const pdf = new jsPDF('p','pt','a4');
    //     console.log('pdf: ', pdf);
    // });

    const ref = createRef();

    const clicked = () => {
        const pdf = jsPDF('p','pt','a4');
        console.log('ref: ', ref);
        console.log('ref: ', ref.current);
        pdf.addHTML(document.getElementById('ok'), function() {
            pdf.save('web.pdf');
        });
    };

    return (
        <>
        <Script
            id="html2canvas"
            src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"
            onLoad={() => {
                console.log('html 2 canvas')
            }}/>
        <Script
            id="jspdf"
            src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js"
            onLoad={() => {
                console.log('jspdf')
            }}/>
            <div className="container w-[820px] bg-white p-8 py-12 font-['Arial'] font-bold" id="ok">
                <div className="p-8 py-6 border-slate-300 border-solid border-2">
                    <p className="text-xl">Los Angeles</p>
                    <p className="text-sm font-normal">July, 22 2022&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Itinerary #477cf180</p>
                </div>
                <div className="mt-5 p-8 py-4 border-slate-300 border-solid border-2 border-b-0">
                    <p className="text-2xl">Important Information</p>
                </div>
                <div className="p-8 py-4 border-slate-300 border-solid border-2">
                    <ul className="list-disc">
                        <li>We recommend you complete online check-in and pre-purchase all extras or baggage allowances prior to travelling to
                        avoid higher fees charged by some airlines at the airport.</li>
                        <li>Proof of citizenship is required for international travel. Be sure to bring all necessary documentation (e.g. passport,
                        visa, transit permit). To learn more, visit our Visa and Passport page ..</li>
                    </ul>
                </div>
                <div className="grid grid-cols-5 gap-4 mt-5 pb-8 border-slate-300 border-solid border-2">
                    <div className="col-span-3 pt-8 pl-8 flex flex-wrap gap-x-2 text-xl">
                        <p>Charlotte (CLT) to</p>
                        <p>Los Angeles (LAX)</p>
                        <p className="basis-full text-base font-semibold">July, 22, 2022, One-way ticket</p>
                    </div>
                    <div className="col-span-2 pt-8">
                        <p className="font-bold text-md">CONFIRMED</p>
                    </div>
                    <div className="col-span-3">
                        <div className="px-8 py-4 border-slate-300 border-solid border-2 border-l-0">
                            <p className="font-bold">Reservation is booked and confirmed. No need to call us to reconfirm this resveration</p>
                        </div>
                        <div className="pl-8 pt-4 border-dashed border-slate-300 border-b-2">
                            <p className="mb-5">Traveller Information</p>
                            <ul className="p-4 pl-0">
                                <li>(Adult) Montier Elliott</li>
                            </ul>
                        </div>
                        <div>
                            <p className="p-8 py-4 text-sm">* Seat assignments, special meals, frequent flyer point awards and special
assistance requests should be confirmed directly with the airline.</p>
                            <div className="flex justify-between">
                                <p>July 22, 2022 - Departure 1 Stop</p>
                                <p>Total travel time: 12h 5m</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 border-slate-300 border-solid border-2 border-r-0">
                        <div className="py-2 border-slate-300 border-solid border-b-2">
                            <p className="ml-8 ">Price Summary</p> 
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={clicked}>yo yo yo</button>
            <div ref={ref} id="letsgo"></div>
        </>
    );
};

export default pdfPage;