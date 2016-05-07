
/**
 * ---Module contains nested handlers for LPCM data---
 */

/**
 * Function format (related with optimizations).
 * @typedef {number}
 */
export const fnFormat = Object.freeze({

    SIMPLE: 0,
    ASM_JS: 1
});

/**
 * Base handler object.
 * @type {Object<string, { fn: function(Float32Array), format: fnFormat }>}
 */
export const handlerObj = Object.freeze({

    mul99_100: Object.freeze({}),
    mul99_100__asm: Object.freeze({})
});
