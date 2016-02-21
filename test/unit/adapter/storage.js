define(['adapter/storage'], function(Storage) {
    'use strict';

    describe('StorageAdapter checker', function() {

        var TEST_DB_NAME = 'test_test';

        it('verifies successful DB creating', function(done) {

            Storage.createAdapter(TEST_DB_NAME, { rewrite: true })
                .then(function(res) {

                    console.log(res);
                    expect(res.statusCode).toBe(0);
                    done();
                })
                .catch(function(e) {

                    console.log(e.message);
                    fail(e);
                });
        });

        it('verifies successful data setting', function(done) {

            Storage.createAdapter(TEST_DB_NAME, { rewrite: true })
                .then(function(res) {

                    console.log(res);
                    return res.adapter.set('a', { b: 'c' });
                })
                .then(function(res) {

                    console.log(res);
                    expect(res.statusCode).toBe(0);
                    done();
                })
                .catch(function(e) {

                    console.log(e.message);
                    fail(e);
                });
        });

        it('verifies DATA_ALREADY_EXISTS error', function(done) {

            Storage.createAdapter(TEST_DB_NAME, { useOpen: true })
                .then(function(res) {

                    console.log(res);
                    return res.adapter.set('a', { b: 'cd' });
                })
                .then(function(res) {

                    console.log(res);
                    expect(res.errorMsg).toBe('DATA_ALREADY_EXISTS');
                    done();
                })
                .catch(function(e) {

                    console.log(e.message);
                    fail(e);
                });
        });

        it('verifies error data', function(done) {

            Storage.createAdapter(TEST_DB_NAME)
                .then(function(res) {

                    console.log(res);
                    expect(res.adapter).toBe(null);
                    expect(res.errorMsg).toBe('ALREADY_OPEN');
                    done();
                })
                .catch(function(e) {

                    console.log(e.message);
                    fail(e);
                });
        });

        it('verifies successful data getting', function(done) {

            Storage.createAdapter(TEST_DB_NAME, { useOpen: true })
                .then(function(res) {

                    console.log(res);
                    return res.adapter.get('a');
                })
                .then(function(res) {

                    console.log(res);
                    expect(res.data.b).toBe('c');
                    done();
                })
                .catch(function(e) {

                    console.log(e.message);
                    fail(e);
                });
        });
    });
});
