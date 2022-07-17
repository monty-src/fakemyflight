import React, { useState } from 'react';

import Head from 'next/head';

import Header from '../components/Header';
import MainForm from '../components/MainForm';
import Masthead from '../components/Masthead';

import Results from '../components/Results';

import OneWay from '../components/Oneway';
import RoundTrip from '../components/RoundTrip';

import { transformToUSMoney } from '../utils/transform-price';

const Home = () => {
  const [flights, setFlights] = useState(false);
  const [radio, setRadio] = useState(0);
  const [totalPrice, setTotalPrice] = useState(5);
  const [prices, setPrices] = useState({
    children: 0,
    adults: 5,
  });

  const checkoutValuesInputs = { firstName: '', lastName: '' };
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState({});
  const [formChildrenCheckoutValues, setChildrenFormCheckoutValues] = useState(
    []
  );
  const [formAdultsCheckoutValues, setAdultsFormCheckoutValues] = useState([
    checkoutValuesInputs,
  ]);

  const handleCheckout = () => {
    console.log('email: ', email);
    console.log('adults inputs: ', formAdultsCheckoutValues);
    console.log('children inputs: ', formChildrenCheckoutValues);
  };

  const handleFormCheckoutValues = (i, label, e) => {
    if (label === 'adult') {
      let newFormValues = [...formAdultsCheckoutValues];
      newFormValues[i][e.target.name] = e.target.value;
      setAdultsFormCheckoutValues(newFormValues);
      return false;
    }
    let newFormValues = [...formChildrenCheckoutValues];
    newFormValues[i][e.target.name] = e.target.value;
    setChildrenFormCheckoutValues(newFormValues);
  };

  const addFormFields = (person) => {
    if (person === 'adult') {
      const adults = [...formAdultsCheckoutValues, checkoutValuesInputs];
      if (adults.length === 6) return false;
      setAdultsFormCheckoutValues(adults);
      const adultsPrice = adults.length * 5;
      setPrices({
        ...prices,
        adults: adultsPrice,
      });
      setTotalPrice(prices.children + adultsPrice);
      return false;
    }
    const children = [...formChildrenCheckoutValues, checkoutValuesInputs];
    if (children.length === 6) return false;
    setChildrenFormCheckoutValues([
      ...formChildrenCheckoutValues,
      checkoutValuesInputs,
    ]);
    const childrenPrice = children.length * 2.5;
    setPrices({
      ...prices,
      children: childrenPrice,
    });
    setTotalPrice(childrenPrice + prices.adults);
  };

  const removeFormFields = (i, person) => {
    if (i === 0 && person === 'adult') return false;
    if (person === 'adult') {
      const newFormValues = [...formAdultsCheckoutValues];
      newFormValues.splice(i, 1);
      setAdultsFormCheckoutValues(newFormValues);
      const adultsPrice = newFormValues.length * 5;
      setPrices({
        ...prices,
        adults: adultsPrice,
      });
      setTotalPrice(prices.children + adultsPrice);
      return false;
    }
    const newFormValues = [...formChildrenCheckoutValues];
    newFormValues.splice(i, 1);
    setChildrenFormCheckoutValues(newFormValues);
    const childrenPrice = newFormValues.length * 2.5;
    setPrices({
      ...prices,
      children: childrenPrice,
    });
    setTotalPrice(childrenPrice + prices.adults);
  };

  const oneWay = radio === 0;
  const roundTrip = radio === 1;

  const toggleHide = (index) => {
    setPayment({
      ...payment,
      [index]: !payment[index],
    });
  };

  return (
    <>
      <Head>
        <title>FakeMyFlight</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container lg p-5 grid grid-cols-1 gap-10 lg:gap-y-20 lg:grid-cols-5">
        <Header />
        <Masthead colSize={2}>Content</Masthead>
        <Masthead colSize={3}>
          <MainForm radio={radio} setRadio={setRadio} setFlights={setFlights} />
        </Masthead>
      </main>
      {flights && (
        <Results>
          {flights && oneWay && (
            <OneWay
              data={flights}
              payment={payment}
              email={email}
              totalPrice={totalPrice}
              toggleHide={toggleHide}
              setEmail={setEmail}
              addFormFields={addFormFields}
              handleCheckout={handleCheckout}
              removeFormFields={removeFormFields}
              handleFormCheckoutValues={handleFormCheckoutValues}
              formAdultsCheckoutValues={formAdultsCheckoutValues}
              formChildrenCheckoutValues={formChildrenCheckoutValues}
              setAdultsFormCheckoutValues={setAdultsFormCheckoutValues}
              setChildrenFormCheckoutValues={setChildrenFormCheckoutValues}
            />
          )}
          {flights && roundTrip && (
            <RoundTrip
              data={flights}
              payment={payment}
              email={email}
              toggleHide={toggleHide}
              setEmail={setEmail}
              addFormFields={addFormFields}
              handleCheckout={handleCheckout}
              removeFormFields={removeFormFields}
              handleFormCheckoutValues={handleFormCheckoutValues}
              formAdultsCheckoutValues={formAdultsCheckoutValues}
              formChildrenCheckoutValues={formChildrenCheckoutValues}
            />
          )}
        </Results>
      )}
    </>
  );
};

export default Home;
