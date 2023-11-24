import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { challenge } from "./mod.js";

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

Deno.test("Day 12: Hill Climbing Algorithm", async (test) => {
  await test.step("Part 2: Example", () => {
    assertEquals(challenge(input), 29);
  });
  await test.step("Part 2: Solution", async () => {
    const input = await Deno.readTextFile("./input.txt");
    assertEquals(challenge(input), 443);
  });
});
