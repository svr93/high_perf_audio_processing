/**
 * Module for data storage.
 */
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
function createAdapter(storageName, options) {}

export {

    createAdapter
};
