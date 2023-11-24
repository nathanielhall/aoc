import { chunk } from "../../utils.ts";
const part1 = async () => {
  const { stacks, moves } = await setup();

  moves.forEach((move) => {
    const [num, from, to] = move;

    Array(num).fill(0).map((n, i) => {
      const x = stacks[from - 1].pop();
      if (x === undefined) {
        console.log(`Error in move: ${move}`);
        throw new Error("error");
      }
      stacks[to - 1].push(x);
    });
  });

  const crates = stacks.map((x) => {
    return x[x.length - 1];
  });

  console.log("Part 1", crates.join(""));
};

const part2 = async () => {
  const { stacks, moves } = await setup();

  moves.forEach((move) => {
    const [num, from, to] = move;
    const toMove = stacks[from - 1].splice(num * -1);
    toMove.forEach((item) => stacks[to - 1].push(item));
  });

  const crates = stacks.map((x) => {
    return x[x.length - 1];
  });
  console.log("Part 2", crates.join(""));
};

const setup = async (isExample = false) => {
  const text = await Deno.readTextFile(
    isExample ? "./example.txt" : "./input.txt",
  );
  const [crates, moveLines] = text.split("\n\n").map((x) => x.split("\n"));
  crates.pop();

  const stacks = chunk([...Array(crates[0].length).keys()], 4).map((range) => {
    const column = crates.map((crate) => crate.split("")[range[1]]).filter(
      (x) => x !== " ",
    );

    return column.reverse();
  });

  const moves = moveLines.map((line) => {
    const [one, two] = line.split("from");
    return [one.replace("move", ""), ...two.split("to")].map((x) =>
      parseInt(x.trim())
    );
  });

  return { stacks, moves };
};

part1();
part2();
