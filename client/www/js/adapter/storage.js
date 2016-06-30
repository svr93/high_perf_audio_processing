/**
 * TODO:
 * 1) add support for 'format', 'temporary' options.
 */
/**
 * Module for data storage.
 */
import { indexedDB } from 'global/web-api';
import {
    SUCCESS_CODE,
    getCodeByStringRepresentation
} from 'lib/error-code-manager';
import { checkNativeType } from 'lib/util';

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
 * Chrome non-documented message.
 * @type {string}
 */
const CHROME_ALREADY_EXISTS_MSG = 'Key already exists in the object store.';

/**
 * IStorageAdapter.prototype.set() implementation.
 */
IndexedDBStorageAdapter.prototype.set = function fn(name, data, options) {

    options = options || {};
    let checkRes = checkArgs(arguments, fn);
    if (checkRes !== '') {

        return Promise.resolve({

            statusCode: getCodeByStringRepresentation(checkRes),
            errorMsg: checkRes
        });
    }
    let transaction = this._db.transaction(['defaultStore'], 'readwrite');
    let store = transaction.objectStore('defaultStore');

    let newStoreObj = { key: name, value: data };
    let req = null;
    if (options.rewrite === true) {

        req = store.put(newStoreObj);
    } else {

        req = store.add(newStoreObj);
    }
    let dbName = this._db.name;
    addTransaction(dbName, transaction);

    return new Promise((resolve, reject) => {

        transaction.addEventListener('complete', () => {

            deleteTransaction(dbName, transaction);
            resolve({

                statusCode: SUCCESS_CODE,
                errorMsg: ''
            });
        });
        transaction.addEventListener('error', evt => {

            evt.preventDefault();
            deleteTransaction(dbName, transaction);
            reject(req.error);
        });
    }).catch(err => {

        if (err.message === CHROME_ALREADY_EXISTS_MSG) {

            throw new Error('DATA_ALREADY_EXISTS');
        }
        if (err.name === 'ConstraintError' && options.rewrite !== true) {

            return this.get(name).then(res => {

                if (res.statusCode === SUCCESS_CODE) {

                    throw new Error('DATA_ALREADY_EXISTS');
                } else {

                    throw err;
                }
            });
        } else {

            throw err;
        }
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
IndexedDBStorageAdapter.prototype.get = function fn(name, options) {

    options = options || {};
    let checkRes = checkArgs(arguments, fn);
    if (checkRes !== '') {

        return Promise.resolve({

            data: null,
            format: null,
            statusCode: getCodeByStringRepresentation(checkRes),
            errorMsg: checkRes
        });
    }
    let transaction = this._db.transaction(['defaultStore'], 'readonly');
    let store = transaction.objectStore('defaultStore');

    let req = store.get(name);

    let dbName = this._db.name;
    addTransaction(dbName, transaction);
    return new Promise((resolve, reject) => {

        transaction.addEventListener('complete', () => {

            deleteTransaction(dbName, transaction);
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
        });
        transaction.addEventListener('error', evt => {

            evt.preventDefault();
            deleteTransaction(dbName, transaction);
            reject(req.error);
        });
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
 * Object contains lists with all active transactions.
 * @type {Object<string, Set>}
 */
let transactionObj = {};

/**
 * Creates storage adapter.
 * Uses single promise flow.
 * @param {string} storageName
 * @param {{
 *  rewrite: boolean=, False by default.
 *  useOpen: boolean=, False by default.
 *  collectionName: string= "defaultStore" by default
 * }=} options
 * @return {Promise} Thenable object; resolution -
 * {{
 *  adapter: ?IStorageAdapter Value {null} in case of error.
 *  statusCode: number Value SUCCESS_CODE in case of success,
 *  error code otherwise.
 *  errorMsg: string
 * }}
 */
let createAdapter = function fn(storageName, options) {

    options = options || {};
    let checkRes = checkArgs(arguments, fn);
    if (checkRes !== '') {

        return Promise.resolve({

            adapter: null,
            statusCode: getCodeByStringRepresentation(checkRes),
            errorMsg: checkRes
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
    if (options.rewrite === true) {

        commonPromise = commonPromise
            .then(() => {

                if (openedDBObj.hasOwnProperty(storageName)) {

                    let promiseList = getTransactionDonePromiseList(
                        storageName);

                    openedDBObj[storageName].close();
                    delete openedDBObj[storageName];
                    delete transactionObj[storageName];

                    return Promise.all(promiseList);
                }
                return null;
            })
            .then(() => {

                let deleteRequest = indexedDB.deleteDatabase(storageName);
                return new Promise((resolve, reject) => {

                    deleteRequest.onsuccess = function() {

                        resolve({

                            adapter: null,
                            statusCode: SUCCESS_CODE,
                            errorMsg: ''
                        });
                    };
                    deleteRequest.onerror = function() {

                        reject(new Error('UNKNOWN_ERROR_DELETING_DB'));
                    };
                });
            })
            .catch(commonErrorHandler);
    } else {

        commonPromise = commonPromise.then(() => ({

            adapter: null,
            statusCode: SUCCESS_CODE,
            errorMsg: ''
        }));
    }
    getAdapter(storageName, options);
    return commonPromise;
};

/**
 * Gets adapter with new or existing database.
 * @param {string} storageName
 * @param {Object} options
 */
function getAdapter(storageName, options) {

    let db = null;

    commonPromise = commonPromise
        .then(res => {

            if (res && res.statusCode !== SUCCESS_CODE) {

                throw new Error(res.errorMsg);
            }
            if (openedDBObj.hasOwnProperty(storageName)) {

                if (options.useOpen !== true) {

                    throw new Error('ALREADY_OPEN');
                }
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
                    if (!db.objectStoreNames.contains('defaultStore')) {

                        db.createObjectStore('defaultStore', {

                            keyPath: 'key'
                        });
                    }
                    let transaction = evt.target.transaction;
                    transaction.oncomplete = function() {

                        openRequest.onsuccess = function() {

                            resolve(null);
                        };
                        openRequest.onerror = function() {

                            reject(new Error('DB_CONNECTION_OPEN_ERROR'));
                        };
                    };
                    transaction.onerror = function() {

                        reject(new Error('UNKNOWN_ERROR_TRANSACTION'));
                    };
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
            transactionObj[storageName] = new Set();
            return {

                adapter: new IndexedDBStorageAdapter(storageName),
                statusCode: SUCCESS_CODE,
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

        statusCode = getCodeByStringRepresentation('UNKNOWN_ERROR');
    }
    return {

        adapter: null,
        statusCode: statusCode,
        errorMsg: err.message
    };
}

/**
 * Checks arguments of all external functions.
 * @param {Arguments} argData
 * @param {function()} fn
 */
function checkArgs(argData, fn) {

    if (argData.length > fn.length) {

        return 'TOO_MANY_ARGUMENTS';
    }
    if (argData.length === 0) {

        return 'MISSING_ARGUMENT';
    }
    let lastArgType = checkNativeType(argData[ argData.length - 1 ]);

    if (argData.length === fn.length && lastArgType !== 'Object') {

        return 'INCORRECT_ARGUMENT';
    }
    return '';
}

/**
 * Puts transaction to active transaction list.
 * @param {string} storageName
 * @param {IDBTransaction} transaction
 */
function addTransaction(storageName, transaction) {

    if (!transactionObj.hasOwnProperty(storageName)) { return; }

    transactionObj[storageName].add(transaction);
}

/**
 * Removes transaction from active transaction list.
 * @param {string} storageName
 * @param {IDBTransaction} transaction
 */
function deleteTransaction(storageName, transaction) {

    if (!transactionObj.hasOwnProperty(storageName)) { return; }

    transactionObj[storageName].delete(transaction);
}

/**
 * Gets active transaction list for execution waiting.
 * @param {string} storageName
 * @return {Array<Promise>}
 */
function getTransactionDonePromiseList(storageName) {

    let promiseList = [];
    let transactionSet = transactionObj[storageName];

    for (let item of transactionSet) {

        let promise = getTransactionDonePromise(item);
        promiseList.push(promise);
    }
    return promiseList;
}

/**
 * Gets promise resolves after transaction done.
 * @param {IDBTransaction} transaction
 * @return {Promise}
 */
function getTransactionDonePromise(transaction) {

    return new Promise(resolve => {

        transaction.addEventListener('complete', () => {

            resolve(null);
        });
        transaction.addEventListener('error', () => {

            resolve(null);
        });
    });
}

export {

    createAdapter
};
