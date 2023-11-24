type Tuple = [number, number];
const contains = (a: Tuple, b: Tuple) => b[0] >= a[0] && b[1] <= a[1];
const overlap = (a: Tuple, b: Tuple) =>
  b[0] >= a[0] && b[0] <= a[1] || b[1] <= a[1] && b[1] >= a[0];

const fullyContains = (a: Tuple, b: Tuple) => contains(a, b) || contains(b, a);
const hasOverlap = (a: Tuple, b: Tuple) => overlap(a, b) || overlap(b, a);

async function challenge(part: number) {
  const text = await Deno.readTextFile("./input.txt");
  const lines = text.split("\n").map((x) => x.split(","));

  const result = lines.map((line) => {
    const [pair1, pair2] = line.map((strRange) =>
      strRange.split("-").map((x) => parseInt(x))
    );

    return part === 1 ? fullyContains(pair1, pair2) : hasOverlap(pair1, pair2);
  });

  const numOverlaps = result.filter((x) => !!x)?.length || 0;
  console.log(`Part ${part}`, numOverlaps);
}

challenge(1);
challenge(2);
