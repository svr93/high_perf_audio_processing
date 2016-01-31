define(['adapter/storage'], Storage => {
    'use strict';

    describe('StorageAdapter checker', () => {

        const TEST_DB_NAME = 'test_test';

        it('verifies successful DB creating', () => {

            Storage.createAdapter(TEST_DB_NAME, { rewrite: true })
                .then(res => {

                    expect(res.statusCode).toBe(0);
                });
        });

        it('verifies successful data setting', () => {

            Storage.createAdapter(TEST_DB_NAME, { rewrite: true })
                .then(res => {

                    return res.adapter.set('a', { b: c });
                })
                .then(statusCode => {

                    expect(statusCode).toBe(0);
                });
        });

        it('verifies successful data getting', () => {

            Storage.createAdapter(TEST_DB_NAME)
                .then(res => {

                    return res.adapter.get('a');
                })
                .then(res => expect(res.data.b).toBe('c'));
        });
    });
});
