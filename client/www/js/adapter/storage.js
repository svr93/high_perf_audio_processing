/**
 * Module for data storage.
 */
import { indexedDB } from 'global/web-api';
import { code } from 'lib/error-code-manager';

'use strict';

/**
 * Describes methods for data I/O.
 * @interface
 */
function IStorageAdapter() {}

/**
 * Data setter.
 * @param {string} name
 * @param {*} data
 * @param {{
 *  format: string=, Format for data saving, JSON MIME type by default.
 *  temporary: boolean=, False by default.
 *  rewrite: boolean=, False by default.
 * }=} options
 * @return {Promise} Thenable object; resolution -
 * {number} Status code.
 */
IStorageAdapter.prototype.set = function(name, data, options) {};

/**
 * Data getter.
 * @param {string} name
 * @param {{
 *  format: string=, Format of saved data, JSON MIME type by default.
 * }=} options
 * @return {Promise} Thenable object; resolution -
 * {{
 *  data: {*},
 *  format: ?string, Value {null} in case of error.
 *  statusCode: number
 * }} Object with requested data.
 */
IStorageAdapter.prototype.get = function(name, options) {};

/**
 * Class with wrapped IndexedDB methods.
 * @param {string} storageName
 * @constructor
 * @implements {IStorageAdapter}
 */
function IndexedDBStorageAdapter(storageName) {}

/**
 * IStorageAdapter.prototype.set() implementation.
 */
IndexedDBStorageAdapter.prototype.set = function(name, data, options) {

};

/**
 * IStorageAdapter.prototype.get() implementation.
 */
IndexedDBStorageAdapter.prototype.get = function(name, options) {

};

/**
 * Single promise for DB operation control.
 * @type {Promise} Thenable object; resolution - {null}.
 */
let commonPromise = Promise.resolve(null);

/**
 * Creates storage adapter.
 * Uses single promise flow.
 * @param {string} storageName
 * @param {{
 *  rewrite: boolean=, False by default.
 * }=} options
 * @return {Promise} Thenable object; resolution -
 * {{
 *  adapter: ?IStorageAdapter Value {null} in case of error.
 *  statusCode: number Value 0 in case of success, error code otherwise.
 * }}
 */
function createAdapter(storageName, options) {

    if (arguments.length === 0) {

        return Promise.resolve({

            adapter: null,
            statusCode: code.inputData.MISSING_ARGUMENT
        });
    }
    if (typeof storageName !== 'string' || storageName === '') {

        return Promise.resolve({

            adapter: null,
            statusCode: code.inputData.INCORRECT_ARGUMENT
        });
    }
}

export {

    createAdapter
};
