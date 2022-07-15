import Joi from 'joi';
import moment from 'moment';

export const extractAiport = (airport) => airport.slice(0, 3).toUpperCase();

export const DATE_FORMAT = 'MM-DD-YYYY';
export const API_DATE_FORMAT = 'YYYY-MM-DD';

export const validateFlightsRequest = (data) => {
  let { fromDate, toDate, radio, fromAirport, toAirport } = data;
  const yesterdayDayDate = moment().subtract(1, 'd').format(DATE_FORMAT);

  fromDate = moment(fromDate).format(DATE_FORMAT);
  toDate = radio === 1 ? moment(toDate).format(DATE_FORMAT) : null;
  fromAirport = extractAiport(fromAirport);
  toAirport = extractAiport(toAirport);

  const schema = Joi.object({
    fromDate: Joi.date().greater(yesterdayDayDate).required(),
    toDate: [
      Joi.date().greater(Joi.ref('fromDate')).required(),
      Joi.allow(null),
    ],
    radio: [Joi.number().valid(0).required(), Joi.number().valid(1).required()],
    fromAirport: Joi.string().min(2).max(3).required(),
    toAirport: Joi.string().min(2).max(3).required(),
  });

  return schema.validate({
    fromDate,
    toDate,
    radio,
    fromAirport,
    toAirport,
  });
};
