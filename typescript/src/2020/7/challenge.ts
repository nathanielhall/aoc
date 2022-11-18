// -----------------------------------------------------------
//  Day 7: Handy Haversacks
// -----------------------------------------------------------
import { breadthFirstSearch, readLines } from "../../utils.ts";

const example1: () => string = () => {
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

// mirrored orange bags contain 1 muted chartreuse bag.
// wavy cyan bags contain 3 posh lime bags, 4 dark magenta bags, 4 vibrant turquoise bags.
const example2: () => string = () => {
  return (
    `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
wavy cyan bags contain 3 posh lime bags, 4 dark magenta bags, 4 vibrant turquoise bags.
dark violet bags contain no other bags.`
  );
};

async function part1() {
  const text = await Deno.readTextFile("./input.txt");
  // const text = example1();

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

type ItemType = {
  num: number;
  bagContents: string;
};

async function part2() {
  const text = await Deno.readTextFile("./input.txt");
  // const text = example2();

  type Lookup = Record<string, { [key: string]: number }>;

  const lookup: Lookup = readLines(text)
    .extract().reduce(
      (prev, curr) => {
        const [key, value] = curr.split("contain");

        const stringArray = value.split(",");

        const v = stringArray.reduce((prev, curr: string) => {
          const parts = curr.match(/\d+/g);
          const num = parts && parts?.length ? parseInt(parts[0]) : 0;

          const bagContents = [num.toString(), ".", "bags", "bag"].reduce(
            (prev, replacement) => prev.replace(replacement, ""),
            curr,
          ).trim();

          return { ...prev, [bagContents]: num };
        }, {});

        return ({
          ...prev,
          [key.replace("bags", "").trim()]: v,
        });
      },
      {},
    );

  /**
   * Depth First Search on key/value data structure to tally up lookup values
   */
  const search = (
    lookup: Lookup,
    key: string,
  ) => {
    const values = lookup[key];
    if (!values) return 0;

    let count = 1;
    Object.entries(values).forEach(([k, v]) => {
      count += v * search(lookup, k);
    });

    return count;
  };

  const result = search(lookup, "shiny gold") - 1;
  console.log("result - 1", result);
}

part2();
