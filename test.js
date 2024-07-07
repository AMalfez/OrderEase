const moment = require("moment/moment");

const time = moment("4:55 pm","h:mm a").format('LT');;
console.log(time);
console.log(typeof(time));