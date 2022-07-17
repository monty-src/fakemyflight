import axios from 'axios';
import JsonQuery from 'json-query';

import truncateLegs from '../../../utils/truncate-legs';
import transformPrice from '../../../utils/transform-price';
import { validateFlightRequest } from '../../../utils/schema';
import {
  transformFlightRequest,
  sortByOneWayTripDuration,
  sortByRoundTripDuration,
} from '../../../utils/mutate';

import { oneWayApi, roundTripApi } from '../../../utils/urls';
import mockOneWay from '../one-way.json';
import mockRoundTrip from '../two-way.json';

const { API_KEY, ENV } = process.env;

const DEBUG = ENV === 'local';

export default async function (req, res) {
  const { value: requestBody, error: requestSchemaError } =
    validateFlightRequest(req.body);

  if (requestSchemaError) return res.status(400).json({ requestSchemaError });

  const transformedRequestBody = transformFlightRequest(requestBody);
  const { oneWay, fromAirport, toAirport, fromDate, toDate } =
    transformedRequestBody;

  const flightApiIoRequestURL = oneWay
    ? oneWayApi(API_KEY, fromAirport, toAirport, fromDate)
    : roundTripApi(API_KEY, fromAirport, toAirport, fromDate, toDate);

  const flightApiIoResponse = !DEBUG
    ? await axios.get(flightApiIoRequestURL, {})
    : oneWay
    ? mockOneWay
    : mockRoundTrip;

  const { data: flightApiIoData } = flightApiIoResponse;
  const { legs, trips, fares, airlines, airports } = flightApiIoData;

  const responseContainer = trips.map(({ id: tripID, legIds }) => {
    let second_leg = false;

    let { value: leg } = JsonQuery(`legs[id=${legIds[0]}]`, {
      data: { legs },
    });

    leg = truncateLegs(leg, airlines, airports);

    second_leg = oneWay
      ? second_leg
      : JsonQuery(`legs[id=${legIds[1]}]`, {
          data: { legs },
        }).value;

    second_leg = oneWay ? false : truncateLegs(second_leg, airlines, airports);

    let { value: fare } = JsonQuery(`fares[tripId=${tripID}]`, {
      data: { fares },
    });

    console.log("trasnform price %s", transformPrice(fare.price));

    fare = transformPrice(fare.price);

    return oneWay ? { leg, fare } : { leg, second_leg, fare };
  });

  const response = oneWay
    ? sortByOneWayTripDuration(responseContainer)
    : sortByRoundTripDuration(responseContainer);

  res.status(200).json(response);
}
