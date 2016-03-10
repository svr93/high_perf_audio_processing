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
