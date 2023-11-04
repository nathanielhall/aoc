/*****************************************************************
 * Advent of Code setup utility
 *
 * Pull down the puzzle input and scaffold out files/folders
 * @example
 * deno run --allow-net --allow-read --allow-write --allow-env ./src/aoc.ts --day 3 --year 2020
 *****************************************************************/
import { configSync } from "https://deno.land/std/dotenv/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

const getPuzzleInput = async (day: number, year: number) => {
  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        cookie: configSync().COOKIE,
      },
    },
  );
  return await response.text();
};

const exists = async (filename: string) => {
  try {
    await Deno.readTextFile(filename);
    return true;
  } catch {
    console.log(`${filename} NOT Exists`);
    return false;
  }
};

async function main() {
  const flags = parse(Deno.args, {
    string: ["year", "day"],
    default: { year: "2020" },
  });

  if (!flags?.day) {
    console.error("Must provide a --day flag");
    return;
  }

  const day: number = parseInt(flags.day);
  const year: number = parseInt(flags.year);
  const path = `./src/${year}/${day}`;

  const inputFilename = `${path}/input.txt`;
  const challengeFilename = `${path}/mod.ts`;
  const challengeTestFilename = `${path}/mod_test.ts`;
  const templateFilename = `./src/challenge-template.ts`;
  const testTemplateFilename = `./src/challenge-template-test.ts`;

  const doScaffold = await exists(inputFilename) === false;
  if (!doScaffold) {
    console.warn(`Day ${day} already exists`);
    return;
  }

  console.log(`Scaffolding challenge for day #${day} of ${year}`);
  const data = await getPuzzleInput(day, year);

  try {
    await ensureDir(path);

    await Deno.writeTextFile(inputFilename, data);
    await Deno.copyFile(templateFilename, challengeFilename);
    await Deno.copyFile(testTemplateFilename, challengeTestFilename);
  } catch (err) {
    console.error("error", err);
  }
}

main();
