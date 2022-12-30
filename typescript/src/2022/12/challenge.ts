import PriorityQueue from "../../data-structure/PriorityQueue.ts";

type Item = {
  steps: number;
  point: Point;
};
const part1 = async (filename = "./input.txt") => {
  const text = await Deno.readTextFile(filename);
  const grid = text.split("\n").map((x) => x.split(""));

  let start: Point = [0, 0];
  let end: Point = [0, 0];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const char = grid[i][j];
      if (char === "S") start = [i, j];
      if (char === "E") end = [i, j];
    }
  }

  console.log("end", end);
  const queue = new PriorityQueue<Item>((a, b) => b.steps - a.steps);
  queue.enqueue({ steps: 0, point: end });
  // queue.enqueue({ steps: 0, point: start }); // Part 1

  const visited: boolean[][] = Array.from(
    Array(grid.length),
    () => new Array(grid[0].length).fill(false),
  );

  while (queue.isEmpty() === false) {
    const item = queue.dequeue();
    console.log("item", item);
    if (!item) break;

    const [x, y] = item.point;
    if (visited[x][y] === true) continue;

    visited[x][y] = true;

    // if (x === end[0] && y === end[1]) { // Part 1
    if (height(grid[x][y]) === 0) {
      console.log(`STEPS: ${item.steps}`);
      break;
    }

    neighbor([x, y], grid).forEach((n) =>
      queue.enqueue({ steps: item.steps + 1, point: n })
    );
  }
};

type Point = [number, number];
const neighbor: ([x, y]: Point, grid: string[][]) => Point[] = (
  [x, y],
  grid,
) => {
  const n = grid.length;
  const m = grid[0].length;

  return [[1, 0], [-1, 0], [0, 1], [0, -1]].map(
    ([dx, dy]) => {
      const xx = x + dx;
      const yy = y + dy;
      const isOutside = (xx < 0 || xx >= n) || (yy < 0 || yy >= m);
      if (isOutside) return null;

      // if (height(grid[xx][yy]) <= height(grid[x][y]) + 1) { // Part 1
      if (height(grid[xx][yy]) >= height(grid[x][y]) - 1) {
        return [xx, yy] as Point;
      }
      return null;
    },
  ).filter((x) => x !== null);
};

const height = (char: string) => {
  if (char === "S") return 0;
  if (char === "E") return 25;
  const index = "abcdefghijklmnopqrstuvwxyz".split("").findIndex((x) =>
    x === char
  );
  return index;
};

// -----------------------------------------------------------------
// part1("./example.txt");
part1();
