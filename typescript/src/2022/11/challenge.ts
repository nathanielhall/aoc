import { times } from "../../utils.ts";

type Monkey = {
  num: number;
  inspections: number;
  items: number[];
  operation: string;
  test: [number, number, number];
};

const getMonkeys: (filename: string) => Promise<Monkey[]> = async (
  filename = "./example.txt",
) => {
  const input = await Deno.readTextFile(filename);
  const parseMonkey = (monkeyAsString: string, index: number) => {
    const rows = monkeyAsString.split("\n");
    const monkey: Monkey = {
      num: index,
      inspections: 0,
      items: rows[1].split(":")[1].split(",").map((x) => Number.parseInt(x))
        .reverse(),
      operation: rows[2].split(":")[1].split("=")[1].trim(),
      test: [
        Number.parseInt(rows[3].split(" ").at(-1)),
        Number.parseInt(rows[4].split(" ").at(-1)),
        Number.parseInt(rows[5].split(" ").at(-1)),
      ],
    };
    return monkey;
  };

  return input.split("\n\n").map(parseMonkey);
};

const determineThrow = (
  item: number,
  operation: string,
  test: [number, number, number], // [divisor, True, False],
  modulus: number | null,
) => {
  const calc = operation.replaceAll("old", item.toString());
  const newWorryLevel: number = modulus
    ? Math.floor(eval(calc)) % modulus
    : Math.floor(eval(calc) / 3);
  const throwTo = newWorryLevel % test[0] === 0 ? test[1] : test[2];
  return { monkeyIndex: throwTo, worryLevel: newWorryLevel };
};

const performRound = (monkeys: Monkey[], isPart1 = true) => {
  const modulus = lcm(monkeys.map((m) => m.test[0]));

  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];

    while (monkey.items.length > 0) {
      const item = monkey.items.pop();
      if (item === undefined) break;

      const { monkeyIndex, worryLevel } = determineThrow(
        item,
        monkey.operation,
        monkey.test,
        isPart1 ? null : modulus,
      );

      const { items: prevItems } = monkeys[monkeyIndex];
      monkeys[monkeyIndex].items = [worryLevel, ...prevItems];
      monkey.inspections++;
    }
  }
};

const part1 = async (filename = "./example.txt") => {
  const monkeys = await getMonkeys(filename);
  times(20, () => performRound(monkeys));

  monkeys.forEach((x) =>
    console.log(`Monkey ${x.num} inspected items ${x.inspections} times`)
  );

  const [first, second] = monkeys.sort((a, b) => b.inspections - a.inspections)
    .slice(
      0,
      2,
    ).map((x) => x.inspections);

  console.log("Part 1", first * second);
};

const part2 = async (filename = "./example.txt") => {
  const monkeys = await getMonkeys(filename);
  times(10000, () => performRound(monkeys, false));

  monkeys.forEach((x) =>
    console.log(`Monkey ${x.num} inspected items ${x.inspections} times`)
  );

  const [first, second] = monkeys.sort((a, b) => b.inspections - a.inspections)
    .slice(
      0,
      2,
    ).map((x) => x.inspections);

  console.log("Part 2", first * second);
};

/** Greatest common divisor */
const gcdOverTwo = (x = 0, y = 0): number => {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
};

export const gcd = (x?: number | number[], y?: number): number =>
  Array.isArray(x) ? x.reduce((a, n) => gcdOverTwo(a, n), 1) : gcdOverTwo(x, y);

/** Least common multiple */
const lcmOverTwo = (x?: number, y?: number): number =>
  !x || !y ? 0 : Math.abs((x * y) / gcd(x, y));

export const lcm = (x?: number | number[], y?: number): number =>
  Array.isArray(x) ? x.reduce((a, n) => lcmOverTwo(a, n), 1) : lcmOverTwo(x, y);

// -----------------------------------------------------------------
await part1("./input.txt");
await part2("./input.txt");
