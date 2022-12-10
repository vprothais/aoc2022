/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

export interface operator<T, U> {
  (input: T): U;
}

export function pipe<T>(): operator<T, T>;
export function pipe<T, A>(op1: operator<T, A>): operator<T, A>;
export function pipe<T, A, B>(op1: operator<T, A>, op2: operator<A, B>): operator<T, B>;
export function pipe<T, A, B, C>(op1: operator<T, A>, op2: operator<A, B>, op3: operator<B, C>): operator<T, C>;
export function pipe(...functions: operator<any, any>[]): any {
  return (input: any) => functions.reduce((acc, func) => func(acc), input);
}

export function sum(accumulator: number, value: number): number {
  return accumulator + value;
}
