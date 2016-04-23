import {

    MediaStream,
    AudioContext,
    mediaDevices,
    MediaRecorder,
    RTCPeerConnection,
    crypto,
    IDBKeyRange
} from 'global/web-api';

/**
 * ---Module for feature support check---
 */

/**
 * TODO:
 *  1) add feature check for all functions with 'BUGGY' block.
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

    code = +code;
    for (let key in supportLevel) {

        if (supportLevel[key] === code) {

            return key;
        }
    }
    return false;
}

/**
 * Checks MediaStream API support.
 *
 * Chrome (Canary) 52: stable 'audioprocess' event emitting.
 * Chrome 50: emitting can be closed after a short amount of time.
 *
 * @param {string=} feature Concrete feature.
 * @return {supportLevel}
 */
export function checkMediaStreamSupportLevel(feature) {

    if (isMediaStreamAsSourceSupported() &&
        mediaDevices.constructor.name === 'Object') { /* Safari TP check */

        return supportLevel.BROKEN;
    }
    if (IDBKeyRange.prototype.hasOwnProperty('includes')) {

        return supportLevel.FULL; /* 'includes': Ch 52 (w/o flag), FF 47 */
    }
    if (isMediaStreamAsSourceSupported()) {

        if (feature) {

            if (feature === 'deviceList') {

                if (mediaDevices.enumerateDevices) {

                    return supportLevel.FULL;
                }
                return supportLevel.NONE;
            }
            if (feature === 'streamId') {

                if (MediaStream.prototype.hasOwnProperty('id')) {

                    return supportLevel.FULL;
                }
                return supportLevel.NONE;
            } else {

                return supportLevel.UNKNOWN;
            }
        }
        return supportLevel.BUGGY;
    }
    return supportLevel.NONE;
}

/**
 * Checks MediaStream full support.
 * @return {boolean}
 */
function isMediaStreamAsSourceSupported() {

    let prop = 'createMediaStreamSource';
    return !!(MediaStream && AudioContext.prototype.hasOwnProperty(prop));
}

/**
 * Checks MediaRecorder API support.
 * @param {string=} feature Concrete feature.
 * @return {supportLevel}
 */
export function checkMediaRecorderSupportLevel(feature) {

    if (MediaRecorder) {

        return supportLevel.FULL;
    }
    return supportLevel.NONE;
}

/**
 * Checks WebRTC API support.
 * @param {string=} feature Concrete feature.
 * @return {supportLevel}
 */
export function checkWebRTCSupportLevel(feature) {

    if (RTCPeerConnection) {

        return supportLevel.FULL;
    }
    return supportLevel.NONE;
}

/**
 * Checks Web Crypto API support.
 * @param {string=} feature Concrete feature.
 * @return {supportLevel}
 */
export function checkCryptoSupportLevel(feature) {

    if (crypto) {

        return supportLevel.FULL;
    }
    return supportLevel.NONE;
}
