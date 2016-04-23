define([

    'lib/native-support-manager',
    'global/web-api'
], function(Module, WebApi) {
    'use strict';

    var supportLevel = Module.supportLevel;
    var console = WebApi.console;

    describe('NativeSupportManager checker', function() {

        it('verifies export values existance', function() {

            expect(supportLevel).toBeDefined();
            expect(Module.getSupportLevelByCode).toBeDefined();

            expect(Module.checkMediaStreamSupportLevel).toBeDefined();
            expect(Module.checkMediaRecorderSupportLevel).toBeDefined();
            expect(Module.checkWebRTCSupportLevel).toBeDefined();
            expect(Module.checkCryptoSupportLevel).toBeDefined();
        });

        it('verifies function return value type', function() {

            var res;

            res = Module.checkMediaStreamSupportLevel();
            testSupportLevelValue(res);

            res = Module.checkMediaRecorderSupportLevel();
            testSupportLevelValue(res);

            res = Module.checkWebRTCSupportLevel();
            testSupportLevelValue(res);

            res = Module.checkCryptoSupportLevel();
            testSupportLevelValue(res);
        });

        it('verifies "unknown" value support', function() {

            /*
                deleted; reason - "unknown" value used only for functions
                with 'BUGGY' block.
             */
        });

        it('verifies getSupportLevelByCode() func', function() {

            expect(Module.getSupportLevelByCode('-1')).toBe('UNKNOWN');
            expect(Module.getSupportLevelByCode(-2)).toBe(false);
            expect(Module.getSupportLevelByCode(4)).toBe(false);
        });
    });

    /**
     * Tests result of support level check func.
     * @param {*} val
     */
    function testSupportLevelValue(val) {

        console.log(val);
        expect(typeof val).toBe('number');
        expect(typeof Module.getSupportLevelByCode(val)).toBe('string');
    }
});
