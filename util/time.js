/*
Format a date w/ 3-letter month-names
date: A given Date object
*/
exports.formatDate = (date) => {
    if (!isDate(date)) {
        return console.error('[TimeUtil] formatDate() failed, no valid Date object');
    }
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

/*
Check if account is younger than 2 days
createdAt: Date when the account was created
*/
exports.isYounger2 = (createdAt) => {
    if(!isDate(createdAt)) {
        return console.error('[TimeUtil] isYounger2() failed, no valid Date object');
    }
    const result = {
        isYounger: false,
        warnString: ''
    };
    var today = new Date();
    var seconds = Math.floor((today - (createdAt))/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    if(days < 2) {
        result.isYounger = true;
        result.warnString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        return result;
    }
    else {
        return result;
    }
}

/*
Checks if input is a Date object or not
input: string/object/whatever
*/
function isDate(input) {
    if(Object.prototype.toString.call(input) === "[object Date]") {
        return true;
    } else {
        return false;
    }
};