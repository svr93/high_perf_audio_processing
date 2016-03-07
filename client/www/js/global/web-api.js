/**
 * Module for wrapping global variables for Web API access.
 */
import 'vendor/adapterjs/publish/adapter.min';

'use strict';

const JSON = window.JSON;
const Math = window.Math;
const console = window.console;

const indexedDB = window.indexedDB;

/**
 * Wrapper for 'vendor/adapterjs/publish/adapter.min' (non-AMD module)
 * @type {Object}
 */
const AdapterJS = window.AdapterJS;

export {

    JSON,
    Math,
    console,
    indexedDB,
    AdapterJS
};
