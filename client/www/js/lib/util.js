/**
 * Module need for remove JavaScript flaws.
 */

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

export {

    checkNativeType
};
