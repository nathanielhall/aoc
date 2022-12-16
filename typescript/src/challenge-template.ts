const part1 = async (filename = "./example.txt") => {
  const text = await Deno.readTextFile(filename);
  const lines = text.split("\n");
  console.log("text", lines);
  return [];
};

// -----------------------------------------------------------------
part1();
// part1("./input.txt");
