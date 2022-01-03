#!/usr/bin/env node

var readline = require("readline");

const grid = [];
const line_counter = (
  (i = 0) =>
  () =>
    ++i
)();

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line, y = line_counter()) {
  grid[y - 1] = line.split("");
});

rl.on("close", () => {
  const maxY = grid.length;
  const maxX = grid[maxY - 1].length;

  console.log(`maxX: ${maxX} maxY: ${maxY}`);
  const checkSlope = (down, up) => {
    let numTrees = 0;
    const isTree = (x) => x === "#";
    const isOpen = (x) => x === ".";

    let x = 0;
    let y = 0;
    while (y <= maxY - 1) {
      // console.log(`x: ${x} y: ${y}`);
      const value = grid[y][x];

      if (isTree(value)) {
        // console.log("found tree");
        numTrees = numTrees + 1;
      }

      // console.log(`value: ${value} numTrees: ${numTrees}`);

      const change = x + down;
      x = change >= maxX ? change % maxX : change;
      y = y + up;
    }

    // console.log(`Num Trees: ${numTrees}`);
    return numTrees;
  };

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  slopes.forEach((slope) => {
    const [right, down] = slope;
    const result = checkSlope(right, down);

    console.log(`Right ${right} down: ${down} = ${result}`);
  });

  const product = slopes.reduce((total, slope) => {
    const [right, down] = slope;
    const result = checkSlope(right, down);

    return total * result;
  }, 1);

  console.log(`Product: ${product}`);
  process.exit();
});
