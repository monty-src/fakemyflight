import moment from 'moment';
import JsonQuery from 'json-query';
import flights from '../flights.json';

export default function (req, res) {
    
    const airportFrom = 'CLT';
    const aiportTo = 'JFK';

    const fromDate = moment(new Date()).format('YYYY-MM-DD');
    const toDate = moment(new Date()).format('YYYY-MM-DD');

    // const legID = 'CLT-JFK:DL2232~11:DL5452~11:0';

    // one way trip
    // https://api.flightapi.io/onewaytrip/${API_KEY}/${}/JFK/2022-10-11/2/0/1/Economy/USD

    // round way trip
    // https://api.flightapi.io/roundtrip/YOURAPIKEY/LHR/LAX/2019-10-11/2019-10-15/2/0/1/Economy/USD

    // const { legs, trips, fares } = flights;

    // const { value: tripIDs } = JsonQuery(`trips[legIds=${legID}]`, { data: { trips } });
    
    // const { id: tripID } = tripIDs;

    // const { value: fare } = JsonQuery(`fares[tripId=${tripID}]`, { data: { fares } });
    // const { value: leg } = JsonQuery(`legs[id=${legID}]`, { data: { legs } });

    res.status(200).json ({ });

    // res.status(200).json({ leg, fare, tripIDs });

  }