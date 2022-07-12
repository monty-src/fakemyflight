import Script from 'next/script';
import React, {useEffect, createRef} from 'react';

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
            <div className="bg-white p-8" id="ok">
                <div className="p-8 border-black border-solid border-2">
                    <p className="text-4xl">Montier Elliott</p>
                    <p className="text-xl">July, 22 2022 | Itinerary #477cf180</p>
                </div>
            </div>
            <button onClick={clicked}>yo yo yo</button>
            <div ref={ref} id="letsgo"></div>
        </>
    );
};

export default pdfPage;