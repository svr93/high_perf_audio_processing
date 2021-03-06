/**
 * Module for error code control.
 */

'use strict';

const SUCCESS_CODE = 0;

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
        LOW_PRECISION: 13,
        TOO_MANY_ARGUMENTS: 14
    }),
    storage: Object.freeze({

        DB_ALREADY_EXISTS: 20,
        DATA_ALREADY_EXISTS: 21,
        INCOMPATIBLE_INPUT_FORMAT: 22,
        INCOMPATIBLE_OUTPUT_FORMAT: 23,
        UNKNOWN_ERROR_DELETING_DB: 24,
        UNKNOWN_ERROR_CREATING_DB: 25,
        ALREADY_OPEN: 26,
        DB_CONNECTION_OPEN_ERROR: 27,
        DATA_NOT_FOUND: 28,
        UNKNOWN_ERROR_TRANSACTION: 29
    }),
    userMedia: Object.freeze({

        PERMISSION_ERROR_MEDIA: 40
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

/**
 * Gets custom error data.
 * @param {Error} err
 * @return {{
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
function getErrorData(err) {

    let statusCode = getCodeByStringRepresentation(err.message);
    if (statusCode === false) {

        statusCode = getCodeByStringRepresentation('UNKNOWN_ERROR');
    }
    return {

        statusCode: statusCode,
        errorMsg: err.message
    };
}

export {

    SUCCESS_CODE,
    codeBase as code,
    getTypeCodeData,
    getTypeByCode,
    getCodeByStringRepresentation,
    getStringRepresentationByCode,
    getErrorData
};
