/**
 * Module for error code control.
 */

'use strict';

/**
 * Error codes grouped by types for all application modules.
 * Max error value: 99. Min error value: 1.
 * @type {Object<string, Object<string, number> >}
 */
const code = Object.freeze({

});

/**
 * Gets code array associated with type.
 * @param {string} type
 * @return {(boolean|Array<number>)} False in case of incorrect type.
 */
function getTypeCodeData(type) {

}

/**
 * Gets type associated with code.
 * @param {(number|string)} code
 * @return {(boolean|string)} False in case of incorrect code.
 */
function getTypeByCode(code) {

}

/**
 * Gets code associated with string representation.
 * @param {string} str
 * @return {(boolean|number)} False in case of
 * incorrect string representation.
 */
function getCodeByStringRepresentation(str) {

}

/**
 * Gets string representation associated with code.
 * @param {(number|string)} code
 * @return {(boolean|string)} False in case of incorrect code.
 */
function getStringRepresentationByCode(code) {

}

export {

    code,
    getTypeCodeData,
    getTypeByCode,
    getCodeByStringRepresentation,
    getStringRepresentationByCode
};
