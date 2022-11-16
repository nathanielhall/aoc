// import { readLines } from "../../utils.ts";

const example: () => string = () => {
  return (
    `
	line 1
	line 2
	`
  );
};

async function run() {
  // const text = await Deno.readTextFile("./input.txt");
  const text = example();

  //   const structure = readLines(text);
}

run();
