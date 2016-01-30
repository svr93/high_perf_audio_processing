define(['lib/error-code-manager'], ErrorCodeManager => {
    'use strict';

    describe('ErrorCodeManager checker', () => {

        it('verifies error code for interval conformity', () => {

            const LOW_VALUE = 0;
            const HIGH_VALUE = 100;

            var codeData = [];
            for (let i in ErrorCodeManager.code) {

                let type = ErrorCodeManager.code[i];
                for (let j in type) {

                    codeData = codeData.concat(type[j]);
                }
            }
            codeData.forEach(item => {

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

        it('verifies output result after incorrect input value', () => {

            const BAD_INPUT = '';

            expect(ErrorCodeManager.getTypeCodeData(BAD_INPUT))
                .toBeFalsy();
            expect(ErrorCodeManager.getCodeByStringRepresentation(BAD_INPUT))
                .toBeFalsy();
        });
    });
});
