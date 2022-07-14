import moment from 'moment';

export const comparison = (datetime1, datetime2) => {
    datetime1 = moment(datetime1).utc().format('YYYY-MM-DDTHH:mm:SSS');
    datetime2 = moment(datetime1).utc().format('YYYY-MM-DDTHH:mm:SSS');

    console.log('yo yo yo: ', moment(datetime1).isAfter(datetime2));
}

export const timeConvert = n => {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hour(s) and " + rminutes + " minute(s).";
    }