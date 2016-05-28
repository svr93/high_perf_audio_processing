import { performance } from 'global/web-api';
import { initAsmJsModule } from 'global/asm-js-wrapper';
import { SUCCESS_CODE, getErrorData } from 'lib/error-code-manager';

/**
 * ---Module contains nested handlers for LPCM data---
 */

/**
 * Function format (related with optimizations).
 * @enum {number}
 */
export const FnFormat = Object.freeze({

    SIMPLE: 0,
    ASM_JS: 1
});

/**
 * Base handler object.
 * @type {!Object<string, !{
 *  fn: function(!Float32Array, !Float32Array):!{
 *      execTime: number,
 *      statusCode: number,
 *      errorMsg: string
 *  },
 *  format: FnFormat,
 *  optimalArraySize: number=
 * }>}
 *
 * optimalArraySize - size that allows process data w/o performance problems.
 */
export const handlerObj = Object.freeze({

    mul99_100: Object.freeze({

        fn: mul99_100,
        format: FnFormat.SIMPLE,
    }),
    mul99_100__asm_js: Object.freeze({

        fn: mul99_100__asm_js,
        format: FnFormat.ASM_JS,
    }),
});

/**
 * Reference on initialized module.
 * @type {!Object<string, function>}
 */
let fast = initAsmJsModule(asmModule);

/**
 * Executes 'elem * 99 / 100'.
 * @param {!Float32Array} inputArr
 * @param {!Float32Array} outputArr
 * @return {!HandlerResult}
 *
 * --mutable--
 */
function mul99_100(inputArr, outputArr) {

    let len = inputArr.length;
    let startTime = performance.now();

    for (let i = 0; i < len; ++i) {

        outputArr[i] = inputArr[i] * 0.99;
    }
    let execTime = performance.now() - startTime;
    return new HandlerResult(null, execTime);
}

/**
 * Executes 'elem * 99 / 100'.
 * @param {!Float32Array} inputArr
 * @param {!Float32Array} outputArr
 * @return {!HandlerResult}
 *
 * --mutable--
 */
function mul99_100__asm_js(inputArr, outputArr) {

    let len = inputArr.length;
    let fn = fast.mul99_100elem;
    let startTime = performance.now();

    for (let i = 0; i < len; ++i) {

        outputArr[i] = fn(inputArr[i]);
    }
    let execTime = performance.now() - startTime;
    return new HandlerResult(null, execTime);
}

/**
 * Creates handler execution result.
 * @param {?Error} err
 * @param {number} execTime
 * @constructor
 *
 * --performanceImprovements--
 */
function HandlerResult(err, execTime) {

    if (err) {

        Object.assign(this, getErrorData(err));
    } else {

        this.statusCode = SUCCESS_CODE;
        this.errorMsg = '';
    }
    this.execTime = execTime;
}

/**
 * Single asm.js module.
 * @param {!Object} stdlib
 */
function asmModule(stdlib) {
    'use asm';

    let fround = stdlib.Math.fround;

    /**
     * Executes 'elem * 99 / 100'.
     * @param {number} elem
     * @return {number}
     */
    function mul99_100elem(elem) {

        elem = fround(elem);
        let coefficient = fround(0.99);
        return fround(elem * coefficient);
    }

    return {

        mul99_100elem: mul99_100elem,
    };
}
