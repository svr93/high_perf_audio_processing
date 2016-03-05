# Audio processing

[![Build Status](https://travis-ci.org/svr93/high_perf_audio_processing.svg?branch=master)](https://travis-ci.org/svr93/high_perf_audio_processing)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/d993cb7ad3bf4805a4835715674ba59c)](https://www.codacy.com/app/svr93/high_perf_audio_processing)
[![devDependency Status](https://david-dm.org/svr93/high_perf_audio_processing/dev-status.svg)](https://david-dm.org/svr93/high_perf_audio_processing#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/svr93/high_perf_audio_processing/badge.svg?branch=master)](https://coveralls.io/github/svr93/high_perf_audio_processing?branch=master)

## Module writing order
### - specification
### - test
### - module code

## Implementation details
### arg check:
#### - IndexedDBStorageAdapter.prototype.set()
#### - IndexedDBStorageAdapter.prototype.get()
#### - createAdapter()

## Tests
### unit/adapter/storage.js CHROME SUCCESS (13.02.16, 18.02.16, 21.02.16,
22.02.16, 23.02.16, 05.05.16)
### unit/adapter/storage.js FIREFOX SUCCESS (13.02.16, 18.02.16, 21.02.16,
22.02.16, 23.02.16, 05.05.16)
### unit/adapter/storage.js SAFARI SUCCESS (14.02.16, 18.02.16, 21.02.16,
22.02.16, 23.02.16, 05.05.16)
### unit/adapter/storage.js OPERA SUCCESS (15.02.16, 18.02.16, 21.02.16,
22.02.16, 23.02.16, 05.05.16)
### unit/adapter/storage.js YANDEX SUCCESS (22.02.16, 23.02.16, 05.05.16)

P.S. Heisenbugs are not considered.
P.P.S. All tested browsers need be closed before tests.
