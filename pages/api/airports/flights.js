import axios from 'axios';
import moment from 'moment';
import JsonQuery from 'json-query';

import { validateFlightsRequest } from '../../../utils/schema';
import { transformFlightRequest } from '../../../utils/mutate';
import { oneWayApi, roundTripApi } from '../../../utils/urls';

const { API_KEY } = process.env;

export default async function (req, res) {
  const { value: requestBody, error: requestSchemaError } =
    validateFlightsRequest(req.body);

  if (requestSchemaError) return res.status(400).json({ requestSchemaError });

  const transformedRequestBody = transformFlightRequest(requestBody);
  const { oneWay, fromAirport, toAirport, fromDate, toDate } =
    transformedRequestBody;

  const flightApiIoRequestURL = oneWay
    ? oneWayApi(API_KEY, fromAirport, toAirport, fromDate)
    : roundTripApi(API_KEY, fromAirport, toAirport, fromDate, toDate);

  const flightApiIoResponse = await axios.get(flightApiIoRequestURL, {});
  const { data: flightApiIoData } = flightApiIoResponse;

  const { legs, trips, fares, airlines, airports } = flightApiIoData;

  const responseContainer = trips.map(({ id: tripID, legIds }) => {
    const { value: leg } = JsonQuery(`legs[id=${legIds[0]}]`, {
      data: { legs },
    });

    const { value: fare } = JsonQuery(`fares[tripId=${tripID}]`, {
      data: { legs },
    });
  });

  res.status(200).json({ data: responseContainer });

  // const { legs, trips, fares, airlines, airports } =
  //   oneWayFlight === 'true' ? oneWay : twoWay;

  // const flightInformationFormatted =
  //   oneWayFlight === 'true'
  //     ? trips.map(({ id, legIds }) => {
  //         const leg = JsonQuery(`legs[id=${legIds[0]}]`, {
  //           data: { legs },
  //         }).value;
  //         const { value: fare } = JsonQuery(`fares[tripId=${id}]`, {
  //           data: { fares },
  //         });
  //         leg.segments = leg.segments.map((segment) => {
  //           const {
  //             airlineCode,
  //             durationMinutes,
  //             stopoverDurationMinutes,
  //             departureAirportCode,
  //             arrivalAirportCode,
  //           } = segment;
  //           const verboseAirline = JsonQuery(`airlines[code=${airlineCode}]`, {
  //             data: { airlines },
  //           }).value.name;
  //           const verboseDurationMinutes = toHoursAndMinutes(durationMinutes);
  //           const verboseStopOverDurationMinutes = toHoursAndMinutes(
  //             stopoverDurationMinutes
  //           );
  //           const verboseDepartureAirportCode = JsonQuery(
  //             `airports[code=${departureAirportCode}]`,
  //             { data: { airports } }
  //           ).value.name;
  //           const verboseArrivalAirportCode = JsonQuery(
  //             `airports[code=${arrivalAirportCode}]`,
  //             { data: { airports } }
  //           ).value.name;
  //           return {
  //             ...segment,
  //             verboseAirline,
  //             verboseDurationMinutes,
  //             verboseStopOverDurationMinutes,
  //             verboseDepartureAirportCode,
  //             verboseArrivalAirportCode,
  //           };
  //         });
  //         return { leg, fare };
  //       })
  //     : trips.map(({ id, legIds }) => {
  //         const leg = JsonQuery(`legs[id=${legIds[0]}]`, {
  //           data: { legs },
  //         }).value;
  //         const second_leg = JsonQuery(`legs[id=${legIds[1]}]`, {
  //           data: { legs },
  //         }).value;
  //         const { value: fare } = JsonQuery(`fares[tripId=${id}]`, {
  //           data: { fares },
  //         });
  //         return { leg, second_leg, fare };
  //       });

  // if (oneWayFlight === 'true') {
  //   flightInformationFormatted.sort(
  //     (a, b) => a.leg.durationMinutes - b.leg.durationMinutes
  //   );
  // } else {
  //   flightInformationFormatted.sort(
  //     (a, b) =>
  //       a.leg.durationMinutes +
  //       a.second_leg.durationMinutes -
  //       (b.leg.durationMinutes + b.second_leg.durationMinutes)
  //   );
  // }

  // return res.status(200).json(flightInformationFormatted);
}
