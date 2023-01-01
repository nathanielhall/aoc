import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./mod.ts";

const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

Deno.test("Day ", async (test) => {
  await test.step("Part 1: Example", () => {
    const test = part1(input);
    // console.log("test", test);
    assertEquals(test, 6046);
  });
  await test.step("Part 2: Example", () => {
    const test = part2(input);
    // console.log("test", test);
    assertEquals(test, 21423);
  });
});
