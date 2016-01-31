/**
 * Module for error code control.
 */

'use strict';

/**
 * Error codes grouped by types for all application modules.
 * Max error value: 99. Min error value: 1.
 * @type {Object<string, Object<string, number> >}
 */
const codeBase = Object.freeze({

    serverResponse: Object.freeze({

        EMPTY_RESPONSE: 1,
        INCOMPATIBLE_FORMAT: 2,
        MISSING_FIELD: 3,
        INCORRECT_FIELD: 4,
        BAD_REQUEST: 5
    }),
    inputData: Object.freeze({

        MISSING_ARGUMENT: 10,
        INCORRECT_ARGUMENT: 11,
        DATA_TOO_BIG: 12,
        LOW_PRECISION: 13
    }),
    storage: Object.freeze({

        DB_ALREADY_EXISTS: 20,
        DATA_ALREADY_EXISTS: 21,
        INCOMPATIBLE_INPUT_FORMAT: 22,
        INCOMPATIBLE_OUTPUT_FORMAT: 23,
        UNKNOWN_ERROR_DELETING_DB: 24,
        UNKNOWN_ERROR_CREATING_DB: 25
    }),
    common: Object.freeze({

        UNKNOWN_ERROR: 90
    })
});

/**
 * Gets code array associated with type.
 * @param {string} type
 * @return {(boolean|Array<number>)} False in case of incorrect type.
 */
function getTypeCodeData(type) {

    let codeObj = codeBase[type];
    if (!codeObj) { return false; }

    let res = [];
    for (let key in codeObj) {

        res.push(codeObj[key]);
    }
    return res;
}

/**
 * Gets type associated with code.
 * @param {(number|string)} code
 * @return {(boolean|string)} False in case of incorrect code.
 */
function getTypeByCode(code) {

    code = +code;

    for (let type in codeBase) {

        let codeObj = codeBase[type];
        for (let i in codeObj) {

            if (codeObj[i] === code) { return type; }
        }
    }
    return false;
}

/**
 * Gets code associated with string representation.
 * @param {string} str
 * @return {(boolean|number)} False in case of
 * incorrect string representation.
 */
function getCodeByStringRepresentation(str) {

    for (let type in codeBase) {

        let codeObj = codeBase[type];
        for (let i in codeObj) {

            if (i === str) { return codeObj[i]; }
        }
    }
    return false;
}

/**
 * Gets string representation associated with code.
 * @param {(number|string)} code
 * @return {(boolean|string)} False in case of incorrect code.
 */
function getStringRepresentationByCode(code) {

    code = +code;

    for (let type in codeBase) {

        let codeObj = codeBase[type];
        for (let i in codeObj) {

            if (codeObj[i] === code) { return i; }
        }
    }
    return false;
}

export {

    codeBase as code,
    getTypeCodeData,
    getTypeByCode,
    getCodeByStringRepresentation,
    getStringRepresentationByCode
};
