/**
 * The `instanceof` operator can only be used when the right-hand side of this expression is assignable to Function
 * (e.g. for a class: must be constructable via `new` === 'newable')
 * This type ensures the compiler that
 * - the type T it gets is actually a class which can be constructed
 */
export interface NewableType<T> {
  new (...args: unknown[]): T;
}
