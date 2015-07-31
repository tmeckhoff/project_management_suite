/**
 * Created by lukedowell on 7/30/15.
 */
var nameGen = require('./randomname');
var unitGen = require('./random');

/**
 * Creates a new employee and returns it
 * @param skill
 *      An optional skill set we want to have
 * @returns {Employee}
 */
function createEmployee(skill) {
    return new Employee(nameGen(), skill, unitGen());
}

/**
 * Represents an employee
 * @param skill
 *      Front-end, Client-side, or server-side. OPTIONAL
 * @returns {Employee}
 * @constructor
 */
function Employee(name, skill, units) {
    this.name = nameGen();
    this.units = unitGen(1, 9);
    this.skill = skill;
}

module.exports = createEmployee;