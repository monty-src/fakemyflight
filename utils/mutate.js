import moment from 'moment';
import JsonQuery from 'json-query';

import { toHoursAndMinutes } from './datetime-utils';
import { DATE_FORMAT, extractAiport } from './schema';

export const verboseAirline = (airlineCode, airlines) =>
  JsonQuery(`airlines[code=${airlineCode}]`, {
    data: { airlines },
  }).value.name;

export const verboseDurationMinutes = (durationMinutes) =>
  toHoursAndMinutes(durationMinutes);

export const verboseStopOverMinutes = (stopoverDurationMinutes) =>
  toHoursAndMinutes(stopoverDurationMinutes);

export const verboseDeparetureAirportCode = (departureAirportCode, airports) =>
  JsonQuery(`airports[code=${departureAirportCode}]`, { data: { airports } })
    .value.name;

export const verboseArrivalAirportCode = (arrivalAirportCode, airports) =>
  JsonQuery(`airports[code=${arrivalAirportCode}]`, { data: { airports } })
    .value.name;

export const transformFlightRequest = ({
  radio,
  fromDate,
  toDate,
  fromAirport,
  toAirport,
}) => {
  const oneWay = radio === 0;

  fromDate = moment(fromDate).format(DATE_FORMAT);
  toDate = oneWay ? null : moment(toDate).format(DATE_FORMAT);

  fromAirport = extractAiport(fromAirport);
  toAirport = extractAiport(toAirport);

  return { oneWay, fromDate, toDate, fromAirport, toAirport };
};

export const truncatelegs = (segments, airlines, airports) => {
  console.log('segments: ', segments);
  return segments.map(
    ({
      airlineCode,
      durationMinutes,
      stopoverDurationMinutes,
      departureAirportCode,
      arrivalAirportCode,
    }) => ({
      arrivalAirportCode,
      departureAirportCode,
      airline: verboseAirline(airlineCode, airlines),
      durationMinutes: verboseDurationMinutes(durationMinutes),
      stopOverMinutes: verboseStopOverMinutes(stopoverDurationMinutes),
      departureAirportCode: verboseDeparetureAirportCode(
        departureAirportCode,
        airports
      ),
      arrivalAirportCode: verboseArrivalAirportCode(
        arrivalAirportCode,
        airports
      ),
    })
  );
};
