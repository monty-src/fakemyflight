import moment from 'moment';
import { DATE_FORMAT, extractAiport } from './schema';

export const verboseAirline = () => {};
export const verboseDurationMinutes = () => {};
export const verboseStopOverMinutes = () => {};
export const verboseDeparetureAirportCode = () => {};
export const verboseArrivalAirportCode = () => {};

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
