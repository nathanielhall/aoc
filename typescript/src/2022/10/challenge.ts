import { chunk } from "../../utils.ts";

type Cycle = {
  num: number;
  x: number;
  signalStrength: number;
  command?: string;
};

const challenge = async (filename = "./example.txt") => {
  const text = await Deno.readTextFile(filename);
  const lines = text.split("\n").filter(Boolean);

  const cycles: Cycle[] = [];

  cycles.push({ num: 1, x: 1, signalStrength: 1 });

  lines.forEach((line) => {
    const [left, right] = line.split(" ");
    const previous = cycles.at(-1);
    if (!previous) throw new Error("Error");

    let num: number = previous.num + 1;

    if (left === "addx") {
      cycles.push({
        num,
        x: previous.x,
        signalStrength: previous.x * num,
        command: line,
      });

      num++;
      const x = previous.x + Number.parseInt(right);
      cycles.push({
        num,
        x,
        signalStrength: x * (num),
        command: line,
      });
    } else {
      // noop

      cycles.push({
        num,
        x: previous.x,
        signalStrength: previous.x * num,
        command: line,
      });
    }
  });

  return cycles;
};

const part1 = async () => {
  const cycles = await challenge("./input.txt");
  console.log("cycles", cycles);

  // 20th, 60th, 100th, 140th, 180th, and 220th cycle
  const sum = [20, 60, 100, 140, 180, 220].reduce(
    (a, b) => a + cycles[b - 1].signalStrength,
    0,
  );
  console.log("Part 1", sum);
};

const part2 = async () => {
  const data = await challenge("./input.txt");

  const cycles = data.filter((x) => x.num !== 1).map((x) => ({
    ...x,
    num: x.num - 1,
  }));

  const initial = `###.....................................`.split("");

  const writePixel = (
    acc: { sprite: string[]; crt: string[] },
    cycle: Cycle,
    currentIndex: number,
  ) => {
    const pixel = acc.sprite.at(currentIndex);

    // reset sprite
    const newSprite = Array(40).fill(".");
    newSprite[cycle.x - 1] = "#";
    newSprite[cycle.x] = "#";
    newSprite[cycle.x + 1] = "#";

    if (!pixel) throw new Error("Pixel not found");

    return {
      sprite: newSprite,
      crt: [...acc.crt, pixel],
    };
  };

  const result = chunk(cycles, 40).flatMap((group) =>
    group.reduce(writePixel, { sprite: initial, crt: [] })
  );

  console.log("Part 2", result.map((x) => x.crt.join("")));
};

// -------------------------------------------------------------------
await part1();
await part2();
