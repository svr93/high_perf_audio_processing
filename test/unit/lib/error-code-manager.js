define(['lib/error-code-manager'], function(ErrorCodeManager) {
    'use strict';

    describe('ErrorCodeManager checker', function() {

        it('verifies error code for interval conformity', function() {

            var LOW_VALUE = 0;
            var HIGH_VALUE = 100;

            var codeData = [];
            for (var i in ErrorCodeManager.code) {

                var type = ErrorCodeManager.code[i];
                for (var j in type) {

                    codeData = codeData.concat(type[j]);
                }
            }
            codeData.forEach(function(item) {

                expect(item).toBeGreaterThan(LOW_VALUE);
                expect(item).toBeLessThan(HIGH_VALUE);
            });
            expect(ErrorCodeManager.getTypeByCode(LOW_VALUE)).toBeFalsy();
            expect(ErrorCodeManager.getTypeByCode(HIGH_VALUE)).toBeFalsy();

            expect(ErrorCodeManager.getStringRepresentationByCode(LOW_VALUE))
                .toBeFalsy();
            expect(ErrorCodeManager.getStringRepresentationByCode(HIGH_VALUE))
                .toBeFalsy();
        });

        it('verifies output result after incorrect input value', function() {

            var BAD_INPUT = '';

            expect(ErrorCodeManager.getTypeCodeData(BAD_INPUT))
                .toBeFalsy();
            expect(ErrorCodeManager.getCodeByStringRepresentation(BAD_INPUT))
                .toBeFalsy();
        });
    });
});
