define([

    'global/web-api',
    'lib/error-code-manager',
    'lib/util',
    'lib/media-stream-manager'
], function(WebApi, ErrorCodeManager, Util, MediaStreamManager) {
    'use strict';

    var console = WebApi.console;
    var SUCCESS_CODE = ErrorCodeManager.SUCCESS_CODE;
    var browserName = Util.getBrowserName();

    describe('MediaStreamManager checker', function() {

        /**
         * MediaStream id
         * @type {?string}
         */
        var id = null;

        /**
         * MediaStream types in different browsers.
         * @type {Array<string>}
         */
        var streamTypeList = ['MediaStream', 'LocalMediaStream', 'NPObject'];

        /**
         * Constraints data types.
         * @type {Array<string>}
         */
        var constraintTypeList = ['Object', 'Boolean'];

        /**
         * Special stream options for test.
         * @type {Object}
         */
        var testOptionData = {

            fake: true
        };

        /**
         * Delay for prevent Safari overload.
         * @type {number}
         */
        var SAFARI_DELAY = 100;

        it('verifies successful stream creating', function(done) {

            MediaStreamManager.createStream(testOptionData)
                .then(function(res) {

                    console.log(res);
                    expect(res.statusCode).toBe(SUCCESS_CODE);

                    var streamType = Util.checkNativeType(res.stream);
                    expect(streamTypeList.indexOf(streamType)).not.toBe(-1);

                    id = res.stream.id;
                    done();
                })
                .catch(commonErrorHandler);
        });

        it('verifies id equality', function(done) {

            MediaStreamManager.createStream(testOptionData)
                .then(function(res) {

                    console.log(res);
                    expect(res.stream.id).toBe(id);
                    if (browserName !== 'Apple Safari') {

                        return;
                    }
                    return new Promise(function(resolve) {

                        setTimeout(resolve, SAFARI_DELAY);
                    });
                })
                .then(done)
                .catch(commonErrorHandler);
        });

        it('verifies data with stream constraints', function() {

            var constraintData = MediaStreamManager.getSupportedOptions();
            var type = Util.checkNativeType(constraintData);
            expect(constraintTypeList.indexOf(type)).not.toBe(-1);
            if (constraintData) {

                expect(constraintData.echoCancellation).not.toBe('undefined');
            }
        });
    });

    /**
     * Common error handler for promise.
     * @param {Error} err
     */
    function commonErrorHandler(err) {

        console.log(err.message);
        fail(err);
    }
});
