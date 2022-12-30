// --- Day 9: Rope Bridge ---
import LinkedList from "../../data-structure/LinkedList.ts";
import { graph } from "../../algorithm/test.ts";
import { DFS } from "../../algorithm/DFS.ts";
import { BFS } from "../../algorithm/BFS.ts";

type Tuple = [number, number];
const part1 = async (filename = "./example.txt") => {
  const text = await Deno.readTextFile(filename);
  const lines = text.split("\n");

  const rope = new LinkedList<Tuple>();

  // foreach line
  //   [dir, num]
  //   range(0, num)  <-- each move
  //      linked list...move each knot in rope starting with head as leader
 //       
};

// -----------------------------------------------------------------
part1();
// part1("./input.txt");

// type Point = {
//   x: number;
//   y: number;
// };
// const INPUT = "./input.txt";
// const EXAMPLE = "./example.txt";

// const Direction: Record<string, Point> = {
//   U: { x: 0, y: 1 },
//   D: { x: 0, y: -1 },
//   L: { x: -1, y: 0 },
//   R: { x: 1, y: 0 },
// };

// const render = (knots: Point[]) => {
//   const matrix = Array.from(Array(32), () => new Array(32).fill("."));

//   for (let index = 0; index < knots.length; index++) {
//     const element = knots[index];
//     const colLen = matrix[0].length;

//     const char = index === 0
//       ? "H"
//       : index === knots.length
//       ? "T"
//       : index.toString();

//     const y = colLen - element.y - 1;
//     const x = element.x - 1;
//     try {
//       matrix[y][x] = char;
//     } catch {
//       console.error("ERROR", { char, colLen, x, y, element });
//       break;
//     }
//   }

//   const rows = matrix.map((x) => x.join("")).join("\n");
//   console.log(rows);
//   console.log(``);
// };

// const getDistance = (a: [number, number], b: [number, number]) => {
//   const displacement = b.map((p, i) => p - a[i]);
//   return Math.floor(Math.sqrt(displacement.reduce((dis, p) => dis + p * p, 0)));
// };
// function distance(x1: number, y1: number, x2: number, y2: number): number {
//   return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
// }
// const clamp = (p: [number, number]): [number, number] =>
//   p.map((a) => Math.max(Math.min(a, 1), -1)) as [number, number];

// const setup = async (filename = EXAMPLE, ropeSize = 2) => {
//   const text = await Deno.readTextFile(filename);
//   const lines = text.split("\n");

//   const start: Point = { x: 17, y: 17 };
//   // const knots: Point[] = [start, start]; // head, tail
//   const knots: Point[] = Array(ropeSize).fill(start);
//   console.log("knots", knots);
//   // const tailVisits = new Set<Point>([start]);
//   const tailVisits = [start];

//   lines.forEach((line) => {
//     const [dirString, num] = line.split(" ");
//     let last: Point = start;
//     const move = Direction[dirString];

//     // For each number of moves
//     Array(parseInt(num)).fill(0).forEach((value, index) => {
//       // console.log(`${dirString}`);
//       // For each knot
//       for (let i = 0; i < knots.length; i++) {
//         const knot = knots[i];

//         if (i === 0) {
//           // MOVE HEAD
//           last = knot; // hold onto previous position
//           const newPosition = {
//             x: knot.x + move.x,
//             y: knot.y + move.y,
//           };
//           knots[0] = newPosition;
//         } else {
//           // ---------------------------------------------------
//           // const previousKnot = knots[i - 1];
//           // const diff: Point = {
//           //   x: previousKnot.x - knot.x,
//           //   y: previousKnot.y - knot.y,
//           // };

//           // if (Math.abs(diff.x) >= 2 || Math.abs(diff.y) >= 2) {
//           //   // Update this knot with the last changed position (Follow), then update the "last" pointer
//           //   const temp = knot;
//           //   knots[i] = last;
//           //   last = temp;

//           //   tailVisits.push(last);
//           // } else {
//           //   // no need to move, so stop iterating over followers
//           //   break;
//           // }

//           // ---------------------------------------------------
//           // FOLLOW

//           const previousKnot = knots[i - 1];
//           const displacement = getDistance([
//             previousKnot.x,
//             previousKnot.y,
//           ], [knot.x, knot.y]);

//           if (displacement > 1) {
//             const diff: Point = {
//               x: previousKnot.x - knot.x,
//               y: previousKnot.y - knot.y,
//             };
//             const [x, y] = clamp([diff.x, diff.y]);

//             const newPosition = {
//               x: knot.x + x,
//               y: knot.y + y,
//             };
//             knots[i] = newPosition;
//             last = knot;

//             tailVisits.push(last);
//           } else {
//             // no need to move, so stop iterating over followers
//             break;
//           }

//           // 0000000000000000000000000000000000000000000000000000
//         }

//         // render(knots);
//       }
//     });
//   });

//   const visitedTailPositions = new Set<string>();
//   [...tailVisits].map(({ x, y }) => [x, y]).filter(Boolean).map((
//     [x, y] = [0, 0],
//   ) => `${x}-${y}`).forEach((hash) => visitedTailPositions.add(hash));

//   console.log(visitedTailPositions.size + 1);

//   // const x = knots.length;
//   // console.log("x", x);
//   // console.log("tailVisits LEN", tailVisits.size);

//   // console.log("tailVisits", tailVisits);

//   //   pathTailPositions
//   //     .filter(Boolean)
//   //     .map(([x, y] = [0, 0]) => `${x}-${y}`)
//   //     .forEach((hash) => visitedTailPositions.add(hash));
//   // parse input into some data structure
//   // return [];
// };

// // -----------------------------------------------------------------
// // setup(INPUT, 10);
// // setup();
