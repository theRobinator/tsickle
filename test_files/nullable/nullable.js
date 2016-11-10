goog.module('test_files.nullable.nullable');var module = module || {id: 'test_files/nullable/nullable.js'};class Primitives {
}
// tsickle -> Closure type declarations
/** @type {(null|string)} */
Primitives.prototype.nullable;
/** @type {(undefined|number)} */
Primitives.prototype.undefinable;
/** @type {(undefined|null|string)} */
Primitives.prototype.nullableUndefinable;
/** @type {(undefined|string)} */
Primitives.prototype.optional;
class NonPrimitive {
}
class NonPrimitives {
}
// tsickle -> Closure type declarations
/** @type {NonPrimitive} */
NonPrimitives.prototype.nonNull;
/** @type {(null|NonPrimitive)} */
NonPrimitives.prototype.nullable;
/** @type {(undefined|NonPrimitive)} */
NonPrimitives.prototype.undefinable;
/** @type {(undefined|null|NonPrimitive)} */
NonPrimitives.prototype.nullableUndefinable;
/** @type {(undefined|NonPrimitive)} */
NonPrimitives.prototype.optional;