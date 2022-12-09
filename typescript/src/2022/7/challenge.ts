/*
  Advent of Code 2022
  https://adventofcode.com/2022/day/7
  Day 7: No Space Left On Device
*/

const part1 = async () => {
  const data = await setup();
  const result = Object.values(data).filter((v) => v.total <= 100000).reduce(
    (a, b) => a + b.total,
    0,
  );
  console.log("Part 1", result);
};
const part2 = async () => {
  const data = await setup("./input.txt");

  const total = 70000000;
  const updateSize = 30000000;

  const availableSpace = total - data["/"].total;
  const spaceToFree = updateSize - availableSpace;

  const [result] = Object.entries(data).filter(([k, v]) =>
    v.total >= spaceToFree
  ).map(([k, v]) => ({ path: k, total: v.total })).sort((a, b) =>
    a.total - b.total
  );
  console.log("Part 2", result.total);
};

const setup = async (
  textFile = "./example.txt", // "./input.txt"
) => {
  const text = await Deno.readTextFile(textFile);
  const lines = text.split("\n"); //.slice(0, 20);
  const path: string[] = [];
  const lookup: Record<string, { total: number; size: number }> = {};

  lines.forEach((line) => {
    if (line.startsWith("$ ls") || line.startsWith("dir")) return;
    if (line.startsWith("$ cd")) {
      const [, , arg] = line.split(" ");
      if (arg === "..") {
        path.pop();
        return;
      }

      path.push(
        `${path.at(-1) || ""}${arg === "/" ? arg : `${arg}/`}`,
      );
      return;
    }
    const [size] = line.split(" ");
    const currentDirectory = path.at(-1);
    // Accumulate each path key in lookup with this size
    path.forEach((key) => {
      const item = lookup[key] || { total: 0, size: 0 };
      lookup[key] = {
        total: item.total + parseInt(size),
        size: key === currentDirectory ? item.size + parseInt(size) : item.size,
      };
    });
  });

  return lookup;
};

// -----------------------------------------------------------------
part1();
part2();
