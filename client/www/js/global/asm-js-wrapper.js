
/**
 * --- Module initializes asm.js module with 'window' object---
 */

/**
 * Makes AOT compilation.
 * @param {function(!Object=, ?Object=, !Object=):
 * !Object<string, function>} module
 * @param {?{
 *  heap: boolean
 * }=} options
 * @return {!Object<string, function>}
 */
export function initAsmJsModule(module, options) {

    options = options || {};
    let res = null;
    if (options.heap) {

        res = module(window, null, new ArrayBuffer(0x10000));
    } else {

        res = module(window);
    }
    return res;
}
