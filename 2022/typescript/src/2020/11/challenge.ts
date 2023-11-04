import { readLines } from "../../utils.ts";
import { example1, round1, round2, round3 } from "./examples.ts";

type Point = [number, number];

enum SeatType {
  EMPTY = "L",
  OCCUPIED = "#",
}

const dir: Record<string, Point> = {
  TOPLEFT: [-1, 1],
  TOPRIGHT: [1, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0],
  DOWN: [0, -1],
  UP: [0, 1],
  BOTTOMLEFT: [-1, -1],
  BOTTOMRIGHT: [1, -1],
};

function part1(grid: string[][], shouldLog = false, counter = 0) {
  const result: string[][] = [];

  for (let r = 0; r < grid.length; r++) {
    const columns = grid[r];

    const resultRow: string[] = [];

    for (let c = 0; c < columns.length; c++) {
      const seat = grid[r][c];

      switch (seat) {
        case SeatType.EMPTY: {
          // If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
          const hasAdjacentOccupiedSeats = search(
            grid,
            [r, c],
            SeatType.OCCUPIED,
          )
            .filter(
              Boolean,
            ).length;

          resultRow.push(hasAdjacentOccupiedSeats ? seat : SeatType.OCCUPIED);

          break;
        }

        case SeatType.OCCUPIED: {
          // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
          const numOfAdjacentOccupiedSeats = search(
            grid,
            [r, c],
            SeatType.OCCUPIED,
          ).filter(Boolean)?.length || 0;

          resultRow.push(
            numOfAdjacentOccupiedSeats >= 4 ? SeatType.EMPTY : seat,
          );
          break;
        }

        default:
          resultRow.push(seat);
          break;
      }
    }
    result.push(resultRow);
  }

  if (shouldLog) {
    logGrid(result, counter);
  }

  return result;
}

const search: (grid: string[][], point: Point, find: string) => Array<boolean> =
  (
    grid,
    point,
    find,
  ) => {
    const [x, y] = point;

    const result = Object.entries(dir).map(([_, value]) => {
      const [dirX, dirY] = value;

      const p1 = x + dirX;
      const p2 = y + dirY;

      if (!grid[p1] || !grid[p1][p2]) {
        return false;
      }

      const p = grid[p1][p2];
      return p === find;
    });

    return result;
  };

const logGrid = (grid: string[][], counter: number) => {
  const arr = grid.map((x) => x.join(""));
  const str = arr.join("");
  const occupiedSeats = str.match(/#/gm)?.length || 0;
  console.log(`Grid #${counter} (${occupiedSeats})`, arr);
};

const compare = (x: string[][], y: string[][]) => {
  const a = x.map((r) => r.join("")).join("");
  const b = y.map((r) => r.join("")).join("");

  const match = a === b;
  if (!match) {
    console.error("Did not match!");
  }
  return match;
};

const to2DArray = (text: string) => {
  const rows = readLines(text).extract();
  return rows.map((r) => r.split(""));
};

// IIFE
(async () => {
  // let grid = to2DArray(round2());
  // logGrid(grid, 2);
  // grid = part1(grid, true, 3);
  // const match = compare(grid, to2DArray(round3()));

  const text = await Deno.readTextFile("./input.txt");
  // const text = example1();
  let grid = to2DArray(text);
  logGrid(grid, 0);

  let counter = 1;
  while (counter <= 100) {
    grid = part1(grid, true, counter);
    counter++;
  }
})();
