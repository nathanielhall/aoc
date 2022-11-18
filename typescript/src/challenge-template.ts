// import { readLines } from "../../utils.ts";

const example1: () => string = () => {
  return (
    `
	line 1
	line 2
	`
  );
};

async function part1() {
  // const text = await Deno.readTextFile("./input.txt");
  const text = example1();

  //   const structure = readLines(text);
}

part1();

// const example2: () => string = () => {
//   return (
//     `
// 	line 1
// 	line 2
// 	`
//   );
// };
// async function part2() {
//   // const text = await Deno.readTextFile("./input.txt");
//   const text = example2();

//   //   const structure = readLines(text);
// }

// part2()
