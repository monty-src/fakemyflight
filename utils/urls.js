import moment from 'moment';
import { API_DATE_FORMAT } from './schema';

export const oneWayApi = (api_key, fromAirport, toAirport, fromDate) =>
  `https://api.flightapi.io/onewaytrip/${api_key}/${fromAirport}/${toAirport}/${moment(
    fromDate
  ).format(API_DATE_FORMAT)}/2/0/1/Economy/USD`;

export const roundTripApi = (
  api_key,
  fromAirport,
  toAirport,
  fromDate,
  toDate
) =>
  `https://api.flightapi.io/roundtrip/${api_key}/${fromAirport}/${toAirport}/${moment(
    fromDate
  ).format(API_DATE_FORMAT)}/${moment(toDate).format(
    API_DATE_FORMAT
  )}/2/0/1/Economy/USD`;
