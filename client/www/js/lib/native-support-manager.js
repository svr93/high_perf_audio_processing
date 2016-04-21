import {

    MediaStream,
    AudioContext,
    mediaDevices,
    MediaRecorder,
    RTCPeerConnection,
    crypto
} from 'global/web-api';

/**
 * ---Module for feature support check---
 */

/**
 * Acceptable values for support level.
 * @typedef {number}
 */
export const supportLevel = Object.freeze({

    UNKNOWN:   -1,
    NONE:       0,
    BROKEN:     1,
    BUGGY:      2,
    FULL:       3,
});

/**
 * Gets string representation associated with code.
 * @param {(number|string)} code
 * @return {(boolean|string)} False in case of incorrect code.
 */
export function getSupportLevelByCode(code) {

}

/**
 * Checks MediaStream API support.
 * @param {string=} feature Concrete feature.
 * @return {supportLevel}
 */
export function checkMediaStreamSupportLevel(feature) {

}

/**
 * Checks MediaRecorder API support.
 * @param {string=} feature Concrete feature.
 * @return {supportLevel}
 */
export function checkMediaRecorderSupportLevel(feature) {

}

/**
 * Checks WebRTC API support.
 * @param {string=} feature Concrete feature.
 * @return {supportLevel}
 */
export function checkWebRTCSupportLevel(feature) {

}

/**
 * Checks Web Crypto API support.
 * @param {string=} feature Concrete feature.
 * @return {supportLevel}
 */
export function checkCryptoSupportLevel(feature) {

}
