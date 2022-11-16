// -----------------------------------------------------------
//  Day 7: Handy Haversacks
// -----------------------------------------------------------
import { breadthFirstSearch, readLines } from "../../utils.ts";

const example: () => string = () => {
  return (
    `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`
  );
};

async function main() {
  const text = await Deno.readTextFile("./input.txt");
  // const text = example();

  const lookup = readLines(text).extract().reduce((prev, curr) => {
    const [key, value] = curr.split("contain");

    return ({
      ...prev,
      [key.replace("bags", "").trim()]: value,
    });
  }, {});

  const results = breadthFirstSearch(lookup, "shiny gold");

  console.log(
    `Answer is ${results.length} - Total data set is ${
      Object.keys(lookup).length
    }`,
  );
}

main();
