/*
  Advent of Code 2022
  Day 3: Rucksack Reorganization
  https://adventofcode.com/2022/day/3
*/

import { readLines } from "../../utils.ts";

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

async function part2() {
  const text = await Deno.readTextFile("./input.txt");
  const lines = readLines(text).extract();
  const result = [];
  for (let i = 2; i <= lines.length; i += 3) {
    const group = [
      lines[i - 2].split(""),
      lines[i - 1].split(""),
      lines[i].split(""),
    ];
    const [itemType] = group.reduce((a, b) => a.filter((c) => b.includes(c)));
    const priority = priorities[itemType];
    result.push(priority);
  }
  const sum = result.reduce((a, b) => a + b, 0);
  console.log("Part 2", sum);
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

// ---------------------------------------------------------------
part1();
part2();
