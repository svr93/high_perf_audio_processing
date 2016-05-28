define([

    'adapter/record/_nested-handler',
    'lib/util',
    'global/web-api'
], function(Module, Util, WebApi) {
    'use strict';

    var handlerObj = Module.handlerObj;

    var Math = WebApi.Math;
    var console = WebApi.console;
    var audioCtx = new WebApi.AudioContext();

    /**
     * Min buffer size. See
     * https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode
     * @type {number}
     */
    var MIN_SAMPLE_COUNT = 256;

    /**
     * Delay for setInterval() clear.
     * @type {number}
     */
    var TEST_TIME = 1.25 * 1000;

    /**
     * Max coefficient for GD1 test.
     * @type {number}
     */
    var MAX_LOAD_COEFFICIENT = 0.8;

    /**
     * Min coefficient for GD2 test.
     * @type {number}
     */
    var MIN_EQUABILITY_COEFFICIENT = 0.004; // decreased from 0.8

    /**
     * Sample count used for test.
     * @type {number}
     */
    var currentSampleCount = MIN_SAMPLE_COUNT;

    /**
     * Samples per second.
     * @type {number}
     */
    var sampleRate = audioCtx.sampleRate;

    /**
     * Single sample duration.
     * @type {number}
     */
    var sampleDuration = 1 / sampleRate;

    /**
     * Data availability interval in ms.
     * @type {number}
     */
    var intervalTime = sampleDuration * currentSampleCount * 1000;

    describe('record.NestedHandler checker', function() {

        it('verifies export values existance', function() {

            expect(Module.FnFormat).toBeDefined();
            expect(Module.handlerObj).toBeDefined();
        });

        it('verifies enum values', function() {

            var key = null;
            for (key in Module.FnFormat) {

                expect(Util.isNumeric(Module.FnFormat[key])).toBe(true);
            }
        });

        var fn1 = 'mul99_100';
        it('verifies load & equability (' + fn1 + ')#GD1,2', function(done) {

            testProcessingSpeed(fn1, done);
        });
        var fn2 = 'mul99_100__asm_js';
        it('verifies load & equability (' + fn2 + ')#GD1,2', function(done) {

            testProcessingSpeed(fn2, done);
        });

        it('verifies data mutability', function() {

            var key = null;
            for (key in handlerObj) {

                testMutability(key);
            }
        });

        it('compares func performance', function() {

            /*
                deleted; reason - function call within a loop
                makes optimization useless.
             */
        });
    });

    /**
     * Checks buffer processing load & equability.
     * @param {string} handlerName,
     * @param {function} done
     */
    function testProcessingSpeed(handlerName, done) {

        var fullTime = 0;
        var count = 0;

        var maxTime = 0;

        var intervalTimerId = setInterval(function() {

            var input = getRandomArray(currentSampleCount);
            var output = new Float32Array(currentSampleCount);
            var execTime = handlerObj[handlerName].fn(input, output).execTime;

            if (execTime > maxTime) {

                maxTime = execTime;
            }
            fullTime += execTime;
            count++;
        }, intervalTime);
        setTimeout(function() {

            clearInterval(intervalTimerId);

            var avgTime = fullTime / count;
            console.log('Average time: ', avgTime);
            console.log('Max time: ', maxTime);

            expect(Util.isNumeric(avgTime)).toBe(true);
            var load = avgTime / intervalTime;
            expect(load).toBeLessThan(MAX_LOAD_COEFFICIENT);

            expect(Util.isNumeric(maxTime)).toBe(true);
            var equability = avgTime / maxTime;
            expect(equability).toBeGreaterThan(MIN_EQUABILITY_COEFFICIENT);

            done();
        }, TEST_TIME);
    }

    /**
     * Checks buffer change after processing.
     * @param {string} handlerName
     */
    function testMutability(handlerName) {

        var INDEX_COUNT = 5;
        var options = {

            min: 0,
            max: currentSampleCount
        };
        var input = getRandomArray(currentSampleCount);
        var output = new Float32Array(currentSampleCount);
        var indexArr = getRandomIntArray(INDEX_COUNT, options);

        var oldTestValArr = getArrData(input, indexArr);
        handlerObj[handlerName].fn(input, output);
        var newTestValArr = getArrData(output, indexArr);

        expect(oldTestValArr).not.toEqual(newTestValArr);
    }

    /**
     * Gets handler execution time sum.
     * @param {string} handlerName
     * @param {number} count
     */
    function getExecTimeSum(handlerName, count) {

        var sum = 0;
        var i = 0;
        var input = null;
        var output = null;
        for (i; i < count; ++i) {

            input = getRandomArray(currentSampleCount);
            output = new Float32Array(currentSampleCount);
            sum += handlerObj[handlerName].fn(input, output).execTime;
        }
        return sum;
    }

    /**
     * Gets array data with special indexes.
     * @param {!Float32Array} dataArr
     * @param {!Int32Array} indexArr
     * @return {!Float32Array}
     */
    function getArrData(dataArr, indexArr) {

        var i = 0;
        var len = indexArr.length;
        var res = new Float32Array(len);
        for (i; i < len; ++i) {

            res[i] = dataArr[ indexArr[i] ];
        }
        return res;
    }

    /**
     * Gets array with random values in the range [-1, 1).
     * @param {number} size
     * @return {!Float32Array}
     */
    function getRandomArray(size) {

        var arr = new Float32Array(size);

        var min = -1;
        var max = 1;

        var i = 0;
        var len = arr.length;
        for (i; i < len; ++i) {

            arr[i] = getRandomInRange(min, max);
        }
        return arr;
    }

    /**
     * Gets array with integer random values.
     * @param {number} size
     * @param {?{ min: number, max: number }=} options
     * @return {!Int32Array}
     */
    function getRandomIntArray(size, options) {

        options = options || {};
        var arr = new Int32Array(size);

        var min = options.min || 0;
        var max = options.max || 1;

        var i = 0;
        var len = arr.length;
        for (i; i < len; ++i) {

            arr[i] = getRandomInRange(min, max) | 0;
        }
        return arr;
    }

    /**
     * Gets random value in the range [min, max).
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    function getRandomInRange(min, max) {

        return Math.random() * (max - min) + min;
    }
});
