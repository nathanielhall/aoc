const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const result = data
  .split("\n")
  .filter(Boolean)
  .map((row) => {
    const rowBinary = row
      .split("", 7)
      .map((x) => x.replace("F", 0).replace("B", 1))
      .join("");

    const colBinary = row
      .split("")
      .filter((x) => ["R", "L"].includes(x))
      .map((x) => x.replace("L", 0).replace("R", 1))
      .join("");

    const seatId = parseInt(rowBinary, 2) * 8 + parseInt(colBinary, 2);
    return seatId;
  });

console.log(Math.max(...result));
