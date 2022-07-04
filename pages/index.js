import React, { useState } from 'react';
import Head from 'next/head';

import Form from './components/Form';
import Navbar from './components/Navbar';

export default function Home() {

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Navbar />
      <main className="container lg">

        <section className="bg-gray-100">
          <div className="max-w-screen-xl py-16 mx-auto sm:px-6 lg:px-8">
            <div className="grid ls-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              <div className="lg:py-12 lg:col-span-2">
                <p className="max-w-xl text-lg">
                  At the same time, the fact that we are wholly owned and totally independent from manufacturer and other group
                  control gives you confidence that we will only recommend what is right for you.
                </p>

                <div className="mt-8">
                  <a href="" className="text-2xl font-bold text-pink-600"> 0151 475 4450 </a>
                  <address className="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address>
                </div>
              </div>

              <div className="p-8 bg-white rounded-lg shadow-lg lg:p-12 lg:col-span-3">
                <Form />
              </div>
            </div>
          </div>
        </section>
      </main>   
    </div>
  )
}
