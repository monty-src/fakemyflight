import {
  verboseAirline,
  verboseDurationMinutes,
  verboseStopOverMinutes,
  verboseDeparetureAirportCode,
  verboseArrivalAirportCode,
} from './mutate';

import { extractTime, extractDate } from './datetime-utils';

export default (leg, airlines, airports) => {
  const {
    id,
    duration,
    segments,
    durationMinutes,
    arrivalDateTime,
    stopoversCount,
    stopoverDuration,
    departureDateTime,
    stopoverDurationMinutes,
  } = leg;
  return {
    id,

    stopoversCount,
    stopoverDuration,
    stopoverDurationMinutes,
    
    duration,
    durationMinutes,
    
    arrivalDate: extractDate(arrivalDateTime),
    arrivalTime: extractTime(arrivalDateTime),
    arrivalDateTime,

    departureDate: extractDate(departureDateTime),
    departureTime: extractTime(departureDateTime),
    departureDateTime,

    segments: segments.map(
      ({
        airlineCode,
        designatorCode,
        durationMinutes,
        arrivalDateTime,
        departureDateTime,
        arrivalAirportCode,
        departureAirportCode,
        stopoverDurationMinutes,
      }) => ({
        designatorCode,

        duration: verboseDurationMinutes(durationMinutes),
        durationMinutes,

        stopOver: verboseStopOverMinutes(stopoverDurationMinutes),
        stopoverDurationMinutes,

        airlineCode,
        airlineTitle: verboseAirline(airlineCode, airlines),
        
        arrivalDate: extractDate(arrivalDateTime),
        arrivalTime: extractTime(arrivalDateTime),
        arrivalDateTime,

        departureDate: extractDate(departureDateTime),
        departureTime: extractTime(departureDateTime),
        departureDateTime,
        
        departureAirportCode,
        departureAirport: verboseDeparetureAirportCode(
          departureAirportCode,
          airports
        ),

        arrivalAirportCode,
        arrivalAirport: verboseArrivalAirportCode(arrivalAirportCode, airports),
      })
    ),
  };
};
