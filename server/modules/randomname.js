/**
 * Created by lukedowell on 7/30/15.
 */
var getRandomNum = require('./random');

var FIRST_NAMES = ["Paul", "Burt", "Jerry", "Mini", "Albert", "Jon", "Bob", "Lafonda", "Ladasha"];
var LAST_NAMES = ["O'Neal", "O'Mally", "Stevens", "Chamberlain", "Kline", "Claudine", "Prime"];

/**
 * @returns {string}
 *  A pseudo random name
 */
function genName() {
    var first = FIRST_NAMES[getRandomNum(0, FIRST_NAMES.length-1)];
    var last = LAST_NAMES[getRandomNum(0, LAST_NAMES.length-1)];
    return first + " " + last;
}


module.exports = genName;