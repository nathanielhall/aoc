#!/usr/bin/env node
const fs = require("fs");

// =======================
// Two Sum Problem
// =======================

const input = fs
  .readFileSync("input1.json")
  .toString()
  .split("\n")
  .map((x) => parseInt(x));

const initialValue = { pairs: [], hash: {} };

const findPairs = (arr, S) => {
  const reducer = (total, num) => {
    const { pairs, hash } = total;
    const sumMinusNumber = S - num;

    if (hash[sumMinusNumber.toString()] !== undefined) {
      pairs.push(`${num} + ${sumMinusNumber}`);
    }

    hash[num.toString()] = num;

    return { pairs, hash };
  };

  return arr.reduce(reducer, initialValue);
};

const { pairs } = findPairs(input, 2020);
console.log(pairs);
