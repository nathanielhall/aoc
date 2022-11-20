//--- Day 8: Handheld Halting ---
import { readLines } from "../../utils.ts";

const example1: () => string = () => {
  return (
    `nop -4 
acc +1
jmp +1
acc +3
acc -99
acc +1
acc +6 `
  );
};

async function part1() {
  // const text = await Deno.readTextFile("./input.txt");
  const text = example1();

  const program = readLines(text).extract();

  const p = new Program(program, [new None(), new Jump(), new Accumulate()]);
  p.run();

  console.log("Program Results", { heap: p.heap });
}

type Instruction = [string, number];

class Program {
  heap = 0;
  callstack: Array<Instruction> = [];
  callstackHead = 0;

  constructor(program: string[], private operations: IOperation[]) {
    this.callstack = program.map((line) => {
      const [operation, argument] = line.split(" ");
      return [operation, parseInt(argument)];
    });
  }

  run() {
    while (this.callstackHead < this.callstack.length) {
      const [name, argument] = this.callstack[this.callstackHead];

      const operation = this.operations.find((x) => x.name === name);

      if (!operation) {
        throw new Error(
          `Could not find this operation for ${name}`,
        );
      }

      operation.execute(this, argument);
    }
  }
}

interface IOperation {
  name: string;
  execute(program: Program, arg: number): void;
}

class None implements IOperation {
  name = "nop";

  public execute(program: Program) {
    console.log(`Nothing, then go next`);
    program.callstackHead += 1;
  }
}
class Jump implements IOperation {
  name = "jmp";

  execute(program: Program, arg: number) {
    console.log(`Jump`, arg);
    program.callstackHead += arg + 1;
  }
}
class Accumulate implements IOperation {
  name = "acc";

  execute(program: Program, arg: number) {
    console.log(`Accumulate`, arg);
    program.heap += arg;
    program.callstackHead += 1;
  }
}

part1();
