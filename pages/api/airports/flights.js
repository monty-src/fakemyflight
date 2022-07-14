import axios from 'axios';
import moment from 'moment';
import JsonQuery from 'json-query';
import oneWay from '../one-way.json';
import twoWay from '../two-way.json';
import flights from '../flights.json';

import {comparison} from '../../../utils/datetime-utils';

export default async function (req, res) {

    const oneWayFlight = req.query.oneWay;
    console.log('one way flight: ', oneWayFlight)
    // const { fromDate, toDate, radio, fromAirport, toAirport } = req.body;    
    // const formattedFromAirport = fromAirport.slice(0, 3).toUpperCase();
    // const formattedToAirport = toAirport.slice(0, 3).toUpperCase();
    // const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
    // const formattedToDate = moment(toDate).format('YYYY-MM-DD');

    // res.status(200).json(oneWay);

    // const requestURL = radio === 0 ? 
    // `https://api.flightapi.io/onewaytrip/${process.env.API_KEY}/${formattedFromAirport}/${formattedToAirport}/${formattedFromDate}/2/0/1/Economy/USD` :
    // `https://api.flightapi.io/roundtrip/${process.env.API_KEY}/${formattedFromAirport}/${formattedToAirport}/${formattedFromDate}/${formattedToDate}/2/0/1/Economy/USD`;

    // const response = await axios.get(requestURL, {});
    // const { data } = response;

    const { legs, trips, fares } = (oneWayFlight === 'true' ? oneWay : twoWay);

    const flightLegs = legs.map(leg => leg.id);
    const mutate = flightLegs.map(legID => {
        console.log('legID: ', legID);
        const { value: tripIDs } = JsonQuery(`trips[${legID}]`, { data: { trips } });
        console.log('tripIDs: ', tripIDs);
        console.log('--------------------');
        const { id: tripID, legIds } = tripIDs;
        const { value: fare } = JsonQuery(`fares[tripId=${tripID}]`, { data: { fares } }); 
        if (oneWayFlight === 'true') {
          const { value: leg } = JsonQuery(`legs[id=${legID}]`, { data: { legs } });
          return {leg, fare, tripIDs};
        }
        // console.log('legIds: ', legIds);
        const { value: first_leg } = JsonQuery(`legs[id=${legIds[0]}]`, { data: { legs } });
        const { value: second_leg } = JsonQuery(`legs[id=${legIds[1]}]`, { data: { legs } });
        return {first_leg, second_leg, fare, tripIDs};
    });

    if (oneWayFlight === 'true') {
      mutate.sort((a, b) => (a.leg.durationMinutes - b.leg.durationMinutes));
    } else {
      mutate.sort((a, b) => (a.first_leg.durationMinutes - b.first_leg.durationMinutes));
    }
    
    return res.status(200).json(mutate);

  }