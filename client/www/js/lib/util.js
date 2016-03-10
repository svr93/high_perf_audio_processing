/**
 * Module need for remove JavaScript flaws.
 */
import { userAgent } from 'global/web-api';

'use strict';

/**
 * Regular expression for native type check.
 * @type {RegExp}
 */
let typeCheckRegExp = / ([\w]+)/;

/**
 * Checks native type.
 * @param {*} data
 * @return {string} Examples -
 * [] -> 'Array'
 * new Number(1) -> 'Number' (don't use wrappers for primitives)
 */
function checkNativeType(data) {

    let res = Object.prototype.toString.apply(data);
    return res.match(typeCheckRegExp)[1];
}

/**
 * Provided by Vitaly Mahinov, 2T.
 * @param {*} val
 * @return {boolean}
 */
function isNumeric(val) {

    return parseFloat(val) === val;
}

/**
 * Gets browser name. Provided by MDN.
 * @return {(boolean|string)} False in case of incorrect user agent.
 */
function getBrowserName() {

    if (userAgent.includes('Chrome')) {

        return 'Google Chrome';
    } else if (userAgent.includes('Safari')) {

        return 'Apple Safari';
    } else if (userAgent.includes('Opera')) {

        return 'Opera';
    } else if (userAgent.includes('Firefox')) {

        return 'Mozilla Firefox';
    } else if (userAgent.includes('MSIE')) {

        return 'Microsoft Internet Explorer';
    }
    return false;
}

export {

    checkNativeType,
    isNumeric,
    getBrowserName
};
