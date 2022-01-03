#!/usr/bin/env node
const fs = require("fs");

console.log(__dirname);

const input = fs
  .readFileSync(`${__dirname}/data.txt`)
  .toString()
  .split("\n")
  .filter((x) => {
    const parts = x.split(" ");

    return parts.length === 3 && !!parts[1];
  });

const total = input.length;

const entities = input.map((x) => {
  const parts = x.split(" ");

  const range = parts[0];
  const letter = parts[1].replace(":", "");
  const password = parts[2] || "";

  // validation --------------------------
  const splitRange = range.split("-");
  const index1 = splitRange[0];
  const index2 = splitRange[1];
  const charArray = password.split("");
  //  const values = charArray.filter((x) => x === letter);
  // start / end

  const pos1 = charArray[index1 - 1] || "";
  const pos2 = charArray[index2 - 1] || "";

  const exclusiveOR =
    (pos1 === letter && pos2 !== letter) ||
    (pos1 !== letter && pos2 === letter);

  const isValid = exclusiveOR;
  // true + false ... false + true
  // const isValid = !!values && values.length >= start && values.length <= end;

  // validation --------------------------

  // const regex = `${letter}{${range}}`;
  // const r = new RegExp(regex);
  // const isValid = r.test(password);

  return {
    x,
    parts,
    splitRange,
    charArray,
    charArrayLen: charArray?.length,
    index1,
    index2,
    pos1,
    pos2,
    isValid,
    password,
  };
});

const valid = entities.filter((x) => !!x.isValid).length;
const invalid = entities.filter((x) => x.isValid === false).length;
console.log(`Total: ${total} Valid: ${valid} Invalid: ${invalid}`);

// console.log(entities);

/*
const data = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: cccccccc"];

const asEntity = (x) => {
  const parts = x.split(":");
  const letter = parts[0].split(" ")[1];
  const range = parts[0].split(" ")[0].replace("-", ",");

  const psw = parts[1].trim();
  const regex = `${letter}{${range}}`;

  const r = new RegExp(regex);

  const isValid = r.test(psw);
  //   const isValid = psw.test(`/${letter}{${range}}/`);

  return {
    x,
    password: psw,
    regex: regex,
    isValid,
  };
};

const input = data.map(asEntity);

/*
const input = fs
  .readFileSync("input.json")
  .toString()
  .split("\n")
  .map(asEntity);
  */
/*
console.log(input);

const asEntity = (x) => {
  const parts = x.split(":");
  const letter = parts[0].split(" ")[1];
  const range = parts[0].split(" ")[0].replace("-", ",");

  const psw = parts[1].trim();
  const regex = `${letter}{${range}}`;

  const r = new RegExp(regex);

  const isValid = r.test(psw);
  //   const isValid = psw.test(`/${letter}{${range}}/`);

  return {
    x,
    password: psw,
    regex: regex,
    isValid,
  };
};
*/
