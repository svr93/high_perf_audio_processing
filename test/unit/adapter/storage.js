define(['adapter/storage'], Storage => {
    'use strict';

    describe('StorageAdapter checker', () => {

        const TEST_DB_NAME = 'test_test';

        it('verifies successful DB creating', done => {

            Storage.createAdapter(TEST_DB_NAME, { rewrite: true })
                .then(res => {

                    expect(res.statusCode).toBe(0);
                    done();
                });
        });

        it('verifies successful data setting', done => {

            Storage.createAdapter(TEST_DB_NAME, { rewrite: true })
                .then(res => {

                    return res.adapter.set('a', { b: 'c' });
                })
                .then(res => {

                    expect(res.statusCode).toBe(0);
                    done();
                });
        });

        it('verifies successful data getting', done => {

            Storage.createAdapter(TEST_DB_NAME, { useOpen: true })
                .then(res => {

                    return res.adapter.get('a');
                })
                .then(res => {

                    expect(res.data.b).toBe('c');
                    done();
                });
        });
    });
});
