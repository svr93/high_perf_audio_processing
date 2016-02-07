/**
 * TODO:
 * 1) add support for 'format', 'temporary' options.
 * 2) add 'DATA_ALREADY_EXISTS' error support.
 */
/**
 * Module for data storage.
 */
import { indexedDB } from 'global/web-api';
import {
    SUCCESS_CODE,
    getCodeByStringRepresentation
} from 'lib/error-code-manager';

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
 * {{
 *  statusCode: number,
 *  errorMsg: string
 * }}
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
 *  statusCode: number,
 *  errorMsg: string
 * }} Object with requested data.
 */
IStorageAdapter.prototype.get = function(name, options) {};

/**
 * Class with wrapped IndexedDB methods.
 * @param {string} storageName
 * @constructor
 * @implements {IStorageAdapter}
 */
function IndexedDBStorageAdapter(storageName) {

    this._db = openedDBObj[storageName];
}

/**
 * IStorageAdapter.prototype.set() implementation.
 */
IndexedDBStorageAdapter.prototype.set = function(name, data, options) {

    options = options || {};

    let transaction = this._db.transaction(['defaultStore'], 'readwrite');
    let store = transaction.objectStore('defaultStore');

    let newStoreObj = { key: name, value: data };
    let req = null;
    if (options.rewrite === true) {

        req = store.put(newStoreObj);
    } else {

        req = store.add(newStoreObj);
    }
    return new Promise((resolve, reject) => {

        transaction.oncomplete = function() {

            resolve({

                statusCode: SUCCESS_CODE,
                errorMsg: ''
            });
        };
        transaction.onerror = function() {

            reject(req.error);
        };
    }).catch(err => {

        let errData = commonErrorHandler(err);
        return {

            statusCode: errData.statusCode,
            errorMsg: errData.errorMsg
        };
    });
};

/**
 * IStorageAdapter.prototype.get() implementation.
 */
IndexedDBStorageAdapter.prototype.get = function(name, options) {

    options = options || {};

    let transaction = this._db.transaction(['defaultStore'], 'readonly');
    let store = transaction.objectStore('defaultStore');

    let req = store.get(name);
    return new Promise((resolve, reject) => {

        transaction.oncomplete = function() {

            let res = req.result;
            if (!res) {

                reject(new Error('DATA_NOT_FOUND'));
                return;
            }
            resolve({

                data: req.result.value,
                format: Object.prototype.toString.apply(req.result.value),
                statusCode: SUCCESS_CODE,
                errorMsg: ''
            });
        };
        transaction.onerror = function() {

            reject(req.error);
        };
    }).catch(err => {

        let errData = commonErrorHandler(err);
        return {

            data: null,
            format: null,
            statusCode: errData.statusCode,
            errorMsg: errData.errorMsg
        };
    });
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
    if (arguments.length > 2) {

        let errorMsg = 'TOO_MANY_ARGUMENTS';
        return Promise.resolve({

            adapter: null,
            statusCode: getCodeByStringRepresentation(errorMsg),
            errorMsg: errorMsg
        });
    }
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
    if (options.rewrite !== true &&
        options.useOpen !== true &&
        openedDBObj.hasOwnProperty(storageName)) {

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
    }
    getAdapter(storageName);
    return commonPromise;
}

/**
 * Gets adapter with new or existing database.
 * @param {string} storageName
 */
function getAdapter(storageName) {

    let db = null;

    commonPromise = commonPromise
        .then(res => {

            if (res && res.statusCode !== 0) {

                throw new Error(res.errorMsg);
            }
            if (openedDBObj.hasOwnProperty(storageName)) {

                db = openedDBObj[storageName];
                return null;
            }
            let openRequest = indexedDB.open(storageName);
            return new Promise((resolve, reject) => {

                /**
                 * Need for create DB first time (and add 'defaultStore' then).
                 * @param {Event} evt
                 */
                openRequest.onupgradeneeded = function(evt) {

                    db = evt.target.result;
                    resolve(null);
                };
                openRequest.onsuccess = function(evt) {

                    db = evt.target.result;
                    resolve(null);
                };
                openRequest.onerror = function() {

                    reject(new Error('DB_CONNECTION_OPEN_ERROR'));
                };
            });
        })
        .then(() => {

            openedDBObj[storageName] = db;
            if (!db.objectStoreNames.contains('defaultStore')) {

                db.createObjectStore('defaultStore', { keyPath: 'key' });
            }
            return {

                adapter: new IndexedDBStorageAdapter(storageName),
                statusCode: 0,
                errorMsg: ''
            };
        })
        .catch(commonErrorHandler);
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
