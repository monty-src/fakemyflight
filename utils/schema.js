import Joi from 'joi';
import moment from 'moment';

const extractAiport = (airport) => airport.slice(0, 3).toUpperCase();

export const validateFlightsRequest = (data) => {
  let { fromDate, toDate, radio, fromAirport, toAirport } = data;

  const todaysDate = moment().format('YYYY-MM-DD');
  fromDate = moment(fromDate).format('YYYY-MM-DD');
  toDate = radio === 1 ? moment(toDate).format('YYYY-MM-DD') : null;
  fromAirport = extractAiport(fromAirport);
  toAirport = extractAiport(toAirport);

  const schema = Joi.object({
    fromDate: Joi.date().min(todaysDate).required(),
    toDate: [Joi.date().greater(Joi.ref('from')).required(), Joi.allow(null)],
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
