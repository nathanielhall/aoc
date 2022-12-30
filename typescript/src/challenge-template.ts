export const challenge = (input: string) => {
  const lines = input.split("\n");
  console.log("text", lines);
  return 0;
};

// -----------------------------------------------------------------
const run = async (filename = "./example.txt") => {
  const text = await Deno.readTextFile(filename);
  const result = challenge(text);
  console.log("result", result);
};
// run("./input.txt");
// run();
