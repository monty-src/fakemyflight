import React from 'react';

const Info = () => {
    return (
        <div className="lg:col-span-2 p-8 text-white">
            <h1 className="text-4xl font-medium mb-8">Generate your fake flight ticket here</h1>
            <p className="max-w-xl text-lg">
            Proof of Onward Travel is required by many countries before you even board an ✈️ airplane. 
            If you'd like to keep your travel options open & travel on one-way tickets, this hack is perfect for you! 
            Use this for pranks and anything you like, except for real flights.
            </p>
            <div className="mt-8">
                <p>We use real flight data & real ticket template, to generate a dummy ticket. Must read FAQ before using 👇</p>
            </div>
        </div>
    );
};

export default Info;