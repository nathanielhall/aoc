import { readLines } from "../../utils.ts";

const example1: () => string = () => {
  return (
    `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`
  );
};

async function challenge() {
  const text = await Deno.readTextFile("./input.txt");
  // const text = example1();
  const structure = readLines(text).extract(false);

  type GroupType = {
    group: number;
    items: number[];
    count: number;
    sum: number;
  };
  const result: GroupType[] = [];
  let groupNumber = 0;

  structure.forEach((line) => {
    if (line === "") {
      groupNumber++;
    } else {
      const arr = result[groupNumber] ||
        { group: groupNumber, items: [], count: 0, sum: 0 };

      const calories = [...arr.items, parseInt(line)] || [];

      const newValue: GroupType = {
        group: groupNumber,
        items: calories,
        count: calories.length,
        sum: calories.reduce((a, b) => a + b, 0),
      };

      result[groupNumber] = newValue;
    }
  });

  return result;
}

async function part1() {
  const result = await challenge();
  const [initial] = result;
  const mostCalories = result.reduce((prev, curr) => {
    if (curr.sum > prev.sum) return curr;

    return prev;
  }, initial);

  console.log("result", result);
  console.log("mostCalories", mostCalories);
}

async function part2() {
  const result = await challenge();
  const sorted = result.sort((a, b) => {
    return b.sum - a.sum;
  });

  const [first, second, third] = sorted;

  console.log("sorted", sorted);
  console.log("{first, second, third}", { first, second, third });
  console.log("Answer for Part 2", first.sum + second.sum + third.sum);
}

part2();
