import moment from 'moment';

export const comparison = (datetime1, datetime2) => {
    datetime1 = moment(datetime1).utc().format('YYYY-MM-DDTHH:mm:SSS');
    datetime2 = moment(datetime1).utc().format('YYYY-MM-DDTHH:mm:SSS');

    console.log('yo yo yo: ', moment(datetime1).isAfter(datetime2));
}