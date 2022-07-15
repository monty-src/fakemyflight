import axios from 'axios';
import moment from 'moment';
import JsonQuery from 'json-query';

import oneWay from '../one-way.json';
import twoWay from '../two-way.json';
import { toHoursAndMinutes } from '../../../utils/datetime-utils';

export default async function (req, res) {
  const oneWayFlight = req.query.oneWay;

  // const { fromDate, toDate, radio, fromAirport, toAirport } = req.body;
  // const formattedFromAirport = fromAirport.slice(0, 3).toUpperCase();
  // const formattedToAirport = toAirport.slice(0, 3).toUpperCase();
  // const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
  // const formattedToDate = moment(toDate).format('YYYY-MM-DD');

  // const oneWayFlight = (radio === 0);

  // const requestURL = oneWayFlight ?
  // `https://api.flightapi.io/onewaytrip/${process.env.API_KEY}/${formattedFromAirport}/${formattedToAirport}/${formattedFromDate}/2/0/1/Economy/USD` :
  // `https://api.flightapi.io/roundtrip/${process.env.API_KEY}/${formattedFromAirport}/${formattedToAirport}/${formattedFromDate}/${formattedToDate}/2/0/1/Economy/USD`;

  // const response = await axios.get(requestURL, {});
  // const { data } = response;

  // const { legs, trips, fares } = data;
  const { legs, trips, fares, airlines, airports } =
    oneWayFlight === 'true' ? oneWay : twoWay;

  const flightInformationFormatted =
    oneWayFlight === 'true'
      ? trips.map(({ id, legIds }) => {
          const leg = JsonQuery(`legs[id=${legIds[0]}]`, {
            data: { legs },
          }).value;
          const { value: fare } = JsonQuery(`fares[tripId=${id}]`, {
            data: { fares },
          });
          leg.segments = leg.segments.map((segment) => {
            const {
              airlineCode,
              durationMinutes,
              stopoverDurationMinutes,
              departureAirportCode,
              arrivalAirportCode,
            } = segment;
            const verboseAirline = JsonQuery(`airlines[code=${airlineCode}]`, {
              data: { airlines },
            }).value.name;
            const verboseDurationMinutes = toHoursAndMinutes(durationMinutes);
            const verboseStopOverDurationMinutes = toHoursAndMinutes(
              stopoverDurationMinutes
            );
            const verboseDepartureAirportCode = JsonQuery(
              `airports[code=${departureAirportCode}]`,
              { data: { airports } }
            ).value.name;
            const verboseArrivalAirportCode = JsonQuery(
              `airports[code=${arrivalAirportCode}]`,
              { data: { airports } }
            ).value.name;
            return {
              ...segment,
              verboseAirline,
              verboseDurationMinutes,
              verboseStopOverDurationMinutes,
              verboseDepartureAirportCode,
              verboseArrivalAirportCode,
            };
          });
          return { leg, fare };
        })
      : trips.map(({ id, legIds }) => {
          const leg = JsonQuery(`legs[id=${legIds[0]}]`, {
            data: { legs },
          }).value;
          const second_leg = JsonQuery(`legs[id=${legIds[1]}]`, {
            data: { legs },
          }).value;
          const { value: fare } = JsonQuery(`fares[tripId=${id}]`, {
            data: { fares },
          });
          return { leg, second_leg, fare };
        });

  if (oneWayFlight === 'true') {
    flightInformationFormatted.sort(
      (a, b) => a.leg.durationMinutes - b.leg.durationMinutes
    );
  } else {
    flightInformationFormatted.sort(
      (a, b) =>
        a.leg.durationMinutes +
        a.second_leg.durationMinutes -
        (b.leg.durationMinutes + b.second_leg.durationMinutes)
    );
  }

  return res.status(200).json(flightInformationFormatted);
}
