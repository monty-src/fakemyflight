import axios from 'axios';
import moment from 'moment';
import JsonQuery from 'json-query';

export default async function (req, res) {
    const { fromDate, toDate, radio, fromAirport, toAirport } = req.body;    
    const formattedFromAirport = fromAirport.slice(0, 3).toUpperCase();
    const formattedToAirport = toAirport.slice(0, 3).toUpperCase();
    const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
    const formattedToDate = moment(toDate).format('YYYY-MM-DD');

    const requestURL = radio === 0 ? 
    `https://api.flightapi.io/onewaytrip/${process.env.API_KEY}/${formattedFromAirport}/${formattedToAirport}/${formattedFromDate}/2/0/1/Economy/USD` :
    `https://api.flightapi.io/roundtrip/${process.env.API_KEY}/${formattedFromAirport}/${formattedToAirport}/${formattedFromDate}/${formattedToDate}/2/0/1/Economy/USD`;

    const response = await axios.get(requestURL, {});
    const { data } = response;

    const { legs, trips, fares } = data;
    const flightLegs = legs.map(leg => leg.id);

    const mutate = flightLegs.map(legID => {
        const { value: tripIDs } = JsonQuery(`trips[legIds=${legID}]`, { data: { trips } });
        const { id: tripID } = tripIDs;
        const { value: fare } = JsonQuery(`fares[tripId=${tripID}]`, { data: { fares } });
        const { value: leg } = JsonQuery(`legs[id=${legID}]`, { data: { legs } });
        return {leg, fare, tripIDs};
    });

    res.status(200).json(mutate);

  }