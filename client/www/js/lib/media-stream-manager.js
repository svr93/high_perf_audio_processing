/**
 * TODO:
 * 1) add PERMISSION_ERROR_MEDIA support
 */
/**
 * Module for MediaStream control.
 */
import { AdapterJS, mediaDevices } from 'global/web-api';
import { SUCCESS_CODE, getErrorData } from 'lib/error-code-manager';

'use strict';

/**
 * Single promise for stream creation control.
 * @type {Promise} Thenable object.
 */
let commonPromise = Promise.resolve(null);

/**
 * Single audio stream.
 * @type {?(MediaStream|LocalMediaStream|NPObject)}
 */
let stream = null;

/**
 * Creates single audio stream.
 * @param {Object=} options
 * @return {Promise} Thenable object; resolution -
 * {{
 *  stream: ?(MediaStream|LocalMediaStream|NPObject),
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
function createStream(options) {

    options = options || {};
    commonPromise = commonPromise
        .then(() => {

            if (stream) {

                return stream;
            }
            return new Promise((resolve) => AdapterJS.webRTCReady(resolve))
                .then(() => {

                    options = Object.assign({ audio: true }, options);
                    return mediaDevices.getUserMedia(options);
                });
        })
        .then((res) => {

            stream = res;
            return {

                stream: stream,
                statusCode: SUCCESS_CODE,
                errorMsg: ''
            };
        })
        .catch(commonErrorHandler);
    return commonPromise;
}

/**
 * Common error handler for promise.
 * @param {Error} err
 * @return {{
 *  stream: null,
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
function commonErrorHandler(err) {

    let errData = getErrorData(err);
    errData.stream = null;
    return errData;
}

export {

    createStream
};
