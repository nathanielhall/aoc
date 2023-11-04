/*
  Advent of Code 2022
  Day 3: Rucksack Reorganization
  https://adventofcode.com/2022/day/3
*/

import { chars, chunk, readLines } from "../../utils.ts";

async function part1() {
  const text = await Deno.readTextFile("./input.txt");
  const lines = readLines(text).extract();

  const result = lines.map((line) => {
    const mid = line.length / 2;
    const left = line.slice(0, mid).split("");
    const right = line.slice(mid, line.length).split("");
    const [itemType] = left.filter((x) => right.includes(x));
    return priorities[itemType];
  });

  const sum = result.reduce((a, b) => a + b, 0);
  console.log("Part 1", sum);
}

const uppercase = Array(26).fill(0).reduce((acc, _, index) => ({
  ...acc,
  [String.fromCharCode(65 + index)]: index + 27,
}), {});
const lowercase = Array(26).fill(0).reduce((acc, _, index) => ({
  ...acc,
  [String.fromCharCode(97 + index)]: index + 1,
}), {});

const priorities = { ...lowercase, ...uppercase };

async function part2() {
  const prio = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
    "",
  );
  const lines = await Deno.readTextFile("./input.txt").then((lines) =>
    lines.split(chars.newLine)
  );
  const result = chunk(lines, 3).map((group) => {
    const items = group.map((x) => x.split(""));
    const [itemType] = items.reduce((a, b) => a.filter((c) => b.includes(c)));
    return prio.indexOf(itemType) + 1;
  });

  const sum = result.reduce((a, b) => a + b, 0);
  console.log("Part 2", sum);
}

// ---------------------------------------------------------------
part1();
part2();
