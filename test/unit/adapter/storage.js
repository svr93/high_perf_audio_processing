define(['adapter/storage'], function(Storage) {
    'use strict';

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 7500;

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
                    return Promise.all([

                        res.adapter.set('a', { b: 'c' }),
                        res.adapter.set('d', { e: 'f' }),
                        res.adapter.set('g', { h: 'i' })
                    ]);
                })
                .then(function(res) {

                    console.log(res);
                    res.forEach(function(item) {

                        expect(item.statusCode).toBe(0);
                    });
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
                    return Promise.all([

                        res.adapter.get('a'),
                        res.adapter.get('d'),
                        res.adapter.get('g')
                    ]);
                })
                .then(function(res) {

                    console.log(res);
                    expect(res[0].data.b).toBe('c');
                    expect(res[1].data.e).toBe('f');
                    expect(res[2].data.h).toBe('i');
                    done();
                })
                .catch(function(e) {

                    console.log(e.message);
                    fail(e);
                });
        });
    });
});
