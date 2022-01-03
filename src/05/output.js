
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




  grid[y - 1] = line;
});

rl.on("close", () => {
  const binarySearch = (code, idx, l, r) => {
    if (idx === 7) {
      console.log(`${code[idx]}: ${l} vs ${r}`);
      if (code[6] === "F") return l;
      if (code[6] === "B") return r;
      return "ERROR";
    }
    console.log(` char:${code[idx]} idx:${idx} l:${l} r: ${r}`);

    const mid = l + Math.floor((r - l) / 2);

    if (code[idx] === "F") return binarySearch(code, idx + 1, l, mid);
    if (code[idx] === "B") return binarySearch(code, idx + 1, mid, r);



    return binarySearch(code, idx + 1, l, r);
  };

  grid.forEach((row) => {
    console.log("ROW", row);
    const result = binarySearch(row, 0, 0, 127);

    console.log(`RESULT`, result);
  });
});
