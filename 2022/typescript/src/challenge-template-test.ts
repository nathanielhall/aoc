import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { challenge } from "./mod.ts";

const input = ``;

Deno.test("Day ", async (test) => {
  await test.step("Part 1: Example", () => {
    assertEquals(challenge(input), 0);
  });
});
