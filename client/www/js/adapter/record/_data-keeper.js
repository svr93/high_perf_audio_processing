import { createAdapter } from 'adapter/storage';
import { SUCCESS_CODE, getErrorData } from 'lib/error-code-manager';

/**
 * ---Module for system and audio data saving---
 */

/**
 * Allows to control storage size.
 * @typedef {number}
 */
export const dataPrecision = Object.freeze({

    LOW: 0,
    MEDIUM: 1,
    HIGH: 2
});

/**
 * Creates storage adapter for data saving.
 * @param {{
 *  dataPrecision: dataPrecision
 * }} options
 * dataPrecision - MEDIUM by default.
 * @return {Promise} Thenable object; resolution -
 * {{
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
export function createStorage(options) {}

/**
 * Saves system data in storage.
 * @param {Object} data             <----- explain
 * @return {Promise} Thenable object; resolution -
 * {{
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
export function setSystemData(data) {}

/**
 * Takes system data from storage.
 * @return {Promise} Thenable object; resolution -
 * {{
 *  data: *,                        <----- explain
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
export function getSystemData() {}

/**
 * Saves audio data in storage.
 * @param {Object} data             <----- explain
 * @return {Promise} Thenable object; resolution -
 * {{
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
export function setAudioData(data) {}

/**
 * Takes audio data from storage.
 * @return {Promise} Thenable object; resolution -
 * {{
 *  data: *,                        <----- explain
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
export function getAudioData() {}
