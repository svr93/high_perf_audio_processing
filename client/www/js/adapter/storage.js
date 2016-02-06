/**
 * Module for data storage.
 */
import { indexedDB } from 'global/web-api';
import { getCodeByStringRepresentation } from 'lib/error-code-manager';

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
 * Object with all opened databases.
 * @type {Object<string, IDBDatabase>}
 */
let openedDBObj = {};

/**
 * Creates storage adapter.
 * Uses single promise flow.
 * @param {string} storageName
 * @param {{
 *  rewrite: boolean=, False by default.
 *  useOpen: boolean=, False by default.
 * }=} options
 * @return {Promise} Thenable object; resolution -
 * {{
 *  adapter: ?IStorageAdapter Value {null} in case of error.
 *  statusCode: number Value 0 in case of success, error code otherwise.
 *  errorMsg: string
 * }}
 */
function createAdapter(storageName, options) {

    options = options || {};
    if (arguments.length === 0) {

        let errorMsg = 'MISSING_ARGUMENT';
        return Promise.resolve({

            adapter: null,
            statusCode: getCodeByStringRepresentation(errorMsg),
            errorMsg: errorMsg
        });
    }
    if (typeof storageName !== 'string' || storageName === '') {

        let errorMsg = 'INCORRECT_ARGUMENT';
        return Promise.resolve({

            adapter: null,
            statusCode: getCodeByStringRepresentation(errorMsg),
            errorMsg: errorMsg
        });
    }
    if (options.useOpen !== true && openedDBObj.hasOwnProperty(storageName)) {

        let errorMsg = 'ALREADY_OPEN';
        return Promise.resolve({

            adapter: null,
            statusCode: getCodeByStringRepresentation(errorMsg),
            errorMsg: errorMsg
        });
    }
    if (options.rewrite === true) {

        if (openedDBObj.hasOwnProperty(storageName)) {

            openedDBObj[storageName].close();
            delete openedDBObj[storageName];
        }
        commonPromise = commonPromise
            .then(() => {

                let deleteRequest = indexedDB.deleteDatabase(storageName);
                return new Promise((resolve, reject) => {

                    deleteRequest.onsuccess = function() {

                        resolve({

                            adapter: null,
                            statusCode: 0,
                            errorMsg: ''
                        });
                    };
                    deleteRequest.onerror = function() {

                        reject(new Error('UNKNOWN_ERROR_DELETING_DB'));
                    };
                });
            })
            .catch(commonErrorHandler);
        return commonPromise;
    }
}

/**
 * Common error handler for promise.
 * @param {Error} err
 * @return {{
 *  adapter: null,
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
function commonErrorHandler(err) {

    let statusCode = getCodeByStringRepresentation(err.message);
    if (statusCode === false) {

        statusCode = getCodeByStringRepresentation(
            'UNKNOWN_ERROR');
        return {

            adapter: null,
            statusCode: statusCode,
            errorMsg: err.message
        };
    }
    return {

        adapter: null,
        statusCode: statusCode,
        errorMsg: err.message
    };
}

export {

    createAdapter
};
