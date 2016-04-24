import { AudioContext } from 'global/web-api';
import { SUCCESS_CODE, getErrorData } from 'lib/error-code-manager';
import {
    supportLevel,
    checkMediaStreamSupportLevel
} from 'lib/native-support-manager';

/**
 * ---Package for PCM (Pulse-code modulation) data processing---
 */

/**
 * Describes methods for audio processing.
 * @interface
 */
function IAudioRecorder() {}

/**
 * Starts audio processing.
 * @param {function(Float32Array)=} dataHandler Handler for PCM data.
 * @return {Promise} Thenable object; resolution - {{
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
IAudioRecorder.prototype.start = function(dataHandler) {};

/**
 * Stops audio processing.
 * @return {Promise} Thenable object; resolution - {{
 *  statusCode: number,
 *  errorMsg: string
 * }}
 */
IAudioRecorder.prototype.stop = function() {};

/**
 * Class with wrapped AudioContext methods.
 * @param {MediaStream} stream
 * @constructor
 * @implements {IAudioRecorder}
 */
export function AudioRecorder(stream) {}

/**
 * IAudioRecorder.prototype.start() implementation.
 */
AudioRecorder.prototype.start = function(dataHandler) {};

/**
 * IAudioRecorder.prototype.stop() implementation.
 */
AudioRecorder.prototype.stop = function() {};

/**
 * Nested handlers for audio data.
 */
Object.defineProperty(AudioRecorder.prototype, 'handler', {});
