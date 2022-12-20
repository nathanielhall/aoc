const challenge = async (filename = "./example.txt") => {
  const text = await Deno.readTextFile(filename);
  const lines = text.split("\n");

  type Cycle = {
    num: number;
    x: number;
    signalStrength: number;
    command?: string;
  };
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
        command: `${line}: 1`,
      });

      num++;
      const x = previous.x + Number.parseInt(right);
      cycles.push({
        num,
        x,
        signalStrength: x * (num),
        command: `${line}: 2`,
      });
    } else {
      // noop

      cycles.push({
        num,
        x: previous.x,
        signalStrength: previous.x * num,
        command: `${line}: 3`,
      });
    }
  });

  // 20th, 60th, 100th, 140th, 180th, and 220th cycle
  const sum = [20, 60, 100, 140, 180, 220].reduce(
    (a, b) => a + cycles[b - 1].signalStrength,
    0,
  );

  console.log("sum", sum);
};

// -----------------------------------------------------------------
// challenge();
challenge("./input.txt");
