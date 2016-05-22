/**
 * Module for wrapping global variables for Web API access.
 */
import 'vendor/adapterjs/publish/adapter.min';

'use strict';

const JSON = window.JSON;
const Math = window.Math;
const console = window.console;

const indexedDB = window.indexedDB;
const mediaDevices = window.navigator.mediaDevices;
const userAgent = window.navigator.userAgent;

export const MediaStream =
    window.MediaStream ||
    window.webkitMediaStream ||
    window.mozMediaStream;

export const AudioContext =
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext; /* unprefixed since FF 21 [fxsitecompat] */

/**
 * Unprefixed native function can be used without dependency-style.
 */
export const MediaRecorder = window.MediaRecorder;

export const RTCPeerConnection =
    window.RTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection;

export const crypto = window.crypto;

export const IDBKeyRange =
    window.IDBKeyRange ||
    window.webkitIDBKeyRange ||
    window.mozIDBKeyRange;

export const performance = window.performance;

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
    mediaDevices,
    userAgent,
    AdapterJS
};
