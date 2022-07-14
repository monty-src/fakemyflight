import moment from 'moment';

export const timeConvert = n => {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rhours === 0) return rminutes + " min";
    return rhours + " hr  " + rminutes + " min";
}

export const dateTime = n => 
    `${moment(new Date(n).toDateString()).format('MMMM Do')} ${moment(n).format('h:mm a')}`;