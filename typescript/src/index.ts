import { parse } from "https://deno.land/std/flags/mod.ts";

const flags = parse(Deno.args, {
  string: ["year", "day"],
  default: { year: "2020" },
});

console.log("flags", flags);

// import { getPuzzleInput } from "./utils.ts";

// const input = await getPuzzleInput(7);
// console.log("day 7", input);
