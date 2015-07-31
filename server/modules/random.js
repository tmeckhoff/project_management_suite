/**
 * Created by lukedowell on 7/30/15.
 */
/**
 * Gets a random number
 * @param min
 * @param max
 */
function getRandomNum(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}

module.exports = getRandomNum;