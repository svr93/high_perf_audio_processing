define(['adapter/storage'], function(Storage) {
    'use strict';

    describe('StorageAdapter checker', function() {

        var TEST_DB_NAME = 'test_test';

        it('verifies successful DB creating', function(done) {

            Storage.createAdapter(TEST_DB_NAME, { rewrite: true })
                .then(function(res) {

                    expect(res.statusCode).toBe(0);
                    done();
                });
        });

        it('verifies successful data setting', function(done) {

            Storage.createAdapter(TEST_DB_NAME, { rewrite: true })
                .then(function(res) {

                    return res.adapter.set('a', { b: 'c' });
                })
                .then(function(res) {

                    expect(res.statusCode).toBe(0);
                    done();
                });
        });

        it('verifies successful data getting', function(done) {

            Storage.createAdapter(TEST_DB_NAME, { useOpen: true })
                .then(function(res) {

                    return res.adapter.get('a');
                })
                .then(function(res) {

                    expect(res.data.b).toBe('c');
                    done();
                });
        });
    });
});
