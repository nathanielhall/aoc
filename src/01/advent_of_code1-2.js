#!/usr/bin/env node

const fs = require("fs");
// =======================
// Three Sum Problem
// =======================
const input = fs
  .readFileSync("input1.json")
  .toString()
  .split("\n")
  .map((x) => parseInt(x));

const SUM = 2020;

// ===================
// Brute Force approach
// ===================
const pairs = [];

input.forEach((item1, idx1) => {
  input.forEach((item2, idx2) => {
    if (idx2 === idx1) return;

    input.forEach((item3, idx3) => {
      if (idx3 === idx2) return;

      const total = item1 + item2 + item3;
      if (total === SUM) {
        pairs.push(`${item1} + ${item2} + ${item3}`);
      }
    });
  });
});

console.log(pairs);
