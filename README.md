# Audio processing

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
22.02.16)
### unit/adapter/storage.js FIREFOX SUCCESS (13.02.16, 18.02.16, 21.02.16,
22.02.16)
### unit/adapter/storage.js SAFARI SUCCESS (14.02.16, 18.02.16, 21.02.16,
22.02.16)
### unit/adapter/storage.js OPERA SUCCESS (15.02.16, 18.02.16, 21.02.16,
22.02.16)
### unit/adapter/storage.js YANDEX SUCCESS (22.02.16)

P.S. Heisenbugs are not considered.
P.P.S. All tested browsers need be closed before tests.
