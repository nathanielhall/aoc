#!/usr/bin/env node

const { List } = require("immutable-ext");

const Success = (x) => ({
  isFail: false,
  x,
  fold: (f, g) => g(x),
  concat: (other) => (other.isFail ? other : Success(x)),
});

const Fail = (x) => ({
  isFail: true,
  fold: (f, g) => f(x),
  x,
  concat: (other) => (other.isFail ? Fail(x.concat(other.x)) : Fail(x)),
});

const Validation = (run) => ({
  run,
  concat: (other) =>
    Validation((key, x) => run(key, x).concat(other.run(key, x))),
});

const validate = (spec, obj) =>
  List(Object.keys(spec)).foldMap(
    (key) => spec[key].run(key, obj[key]),
    Success([obj])
  );

const isRequired = Validation((key, x) =>
  !!x ? Success(x) : Fail([`${key} must be present`])
);

const isEmail = Validation((key, x) =>
  /@/.test(x) ? Success(x) : Fail([`${key} must be a valid email`])
);

const isOptional = Validation((key, x) => Success(x));

const numberMin = (min) =>
  Validation((key, x) => {
    const num = Number(x); // must be number
    return !!num && num >= min
      ? Success(x)
      : Fail([`${key} is less than minimum ${min}`]);
  });

const numberMax = (max) =>
  Validation((key, x) => {
    const num = Number(x); // must be number
    return !!num && num <= max
      ? Success(x)
      : Fail([`${key} is greater than maximum of ${max}`]);
  });

const numberRange = (start, end) =>
  Validation((key, x) => {
    const num = Number(x); // must be number
    return !!num && num >= start && num <= end
      ? Success(x)
      : Fail([`${key} is outside range of ${start} to ${end}`]);
  });

const numberLength = (len) =>
  Validation((key, x) => {
    return !!x && x.toString().length === len
      ? Success(x)
      : Fail([`${key} length does not match ${len}`]);
  });

/**
 * Custom Validator
 * @param {(x) => boolean} fn
 */
const customValidator = (fn) =>
  Validation((key, x) => {
    return fn(x) ? Success(x) : Fail([`${key} failed custom validation `]);
  });

const regExValidator = (regex) =>
  Validation((key, x) => {
    return regex.test(x)
      ? Success(x)
      : Fail([`${key} failed custom validation `]);
  });

module.exports = {
  validate,
  isRequired,
  isOptional,
  numberMax,
  numberMin,
  numberLength,
  numberRange,
  customValidator,
  regExValidator,
};
