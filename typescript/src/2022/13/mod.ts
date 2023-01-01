import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";

type Packet = number | Packet[];

const numberToArray = (numOrArray: Packet) =>
  Array.isArray(numOrArray) ? numOrArray : [numOrArray];

const toPacketComparison = (pair: Packet[]) => {
  const [left, right] = pair;
  return comparePackets(left, right);
};

const comparePackets: (left: Packet, right: Packet) => number = (
  left,
  right,
) => {
  const { isArray } = Array;
  if (isArray(left) && isArray(right)) {
    const len = Math.min(left.length, right.length);
    let result = 0;
    for (let i = 0; i < len; i++) {
      result = comparePackets(left[i], right[i]);
      if (result !== 0) break;
    }
    return result === 0 ? left.length - right.length : result;
  } else if (typeof left === "number" && typeof right === "number") {
    return left - right;
  } else {
    return comparePackets(numberToArray(left), numberToArray(right));
  }
};

export const challenge = (input: string) => {
  const toPacket = R.pipe(R.split("\n"), R.map(JSON.parse));

  return R.pipe(
    R.split("\n\n"),
    R.map(toPacket),
    R.map(toPacketComparison),
  )(input);
};

// -----------------------------------------------------------------
const part1 = async (filename = "./example.txt") => {
  const text = await Deno.readTextFile(filename);
  const result: number[] = challenge(text);
  const sum = result.reduce((acc, curr, idx) => {
    if (curr < 0) return acc + idx + 1;
    return acc;
  }, 0);

  console.log("Part 1", sum);
};
const part2 = async (filename = "./example.txt") => {
  const input = await Deno.readTextFile(filename);

  const result = R.pipe(
    R.split("\n"),
    R.filter((x) => x !== ""),
    R.map(JSON.parse),
    R.map((value) => ({ value, isDivider: false })),
    R.append({ value: [[2]], isDivider: true }),
    R.append({ value: [[6]], isDivider: true }),
    R.sort((a, b) => comparePackets(a.value, b.value)),
  )(input);

  const firstDivider = result.findIndex((x) => x.isDivider) + 1;
  const lastDivider = result.findLastIndex((x) => x.isDivider) + 1;

  console.log(`Part 2`, firstDivider * lastDivider);
};
// ------------------------------------------------------------
await part1("./input.txt");
await part2("./input.txt");
