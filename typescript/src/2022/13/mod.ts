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

// -----------------------------------------------------------------
export const part1 = (input: string) => {
  const toPacket = R.pipe(R.split("\n"), R.map(JSON.parse));

  const result: number[] = R.pipe(
    R.split("\n\n"),
    R.map(toPacket),
    R.map(toPacketComparison),
  )(input);

  const sum = result.reduce((acc, curr, idx) => {
    if (curr < 0) return acc + idx + 1;
    return acc;
  }, 0);

  console.log("Part 1", sum);
  return sum;
};

export const part2 = (input: string) => {
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
  return firstDivider * lastDivider;
};
// ------------------------------------------------------------
const filename = "./input.txt";
const text = await Deno.readTextFile(filename);
part1(text);
part2(text);
