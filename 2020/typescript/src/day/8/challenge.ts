//--- Day 8: Handheld Halting ---
import { readLines } from "../../utils.js";

const example1: () => string = () => {
  return (
    `nop +0 
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6 `
  );
};

async function part1() {
  const text = await Deno.readTextFile("./input.txt");
  // const text = example1();

  const program = readLines(text).extract();

  const p = new Program(program, [new None(), new Jump(), new Accumulate()]);
  p.run();
  console.log("Program Results", { heap: p.heap });
}

type Instruction = [string, number, boolean];

class Program {
  heap = 0;
  callstack: Array<Instruction> = [];
  callstackHead = 0;

  constructor(program: string[], private operations: Operation[]) {
    this.callstack = program.map((line) => {
      const [operation, argument] = line.split(" ");
      return [operation, parseInt(argument), false];
    });
  }

  setHead(arg: number) {
    const [key, value] = this.callstack[this.callstackHead];
    this.callstack[this.callstackHead] = [key, value, true];

    this.callstackHead += arg;
  }

  run() {
    while (this.callstackHead < this.callstack.length) {
      const [name, argument, visited] = this.callstack[this.callstackHead];

      if (visited) {
        console.log(
          `Already visited this instruction at ${this.callstackHead} - ${name} ${argument}`,
        );
        break;
      }

      const operation = this.operations.find((x) => x.name === name);

      if (!operation) {
        throw new Error(
          `Could not find this operation for ${name}`,
        );
      }

      // Sure, this could have been a simple condition as opposed to various operation implementations.
      // this would help for cases where a large number of operations exist
      operation.execute(this, argument);
    }
  }
}

interface Operation {
  name: string;
  execute(program: Program, arg: number): void;
}

class None implements Operation {
  name = "nop";

  public execute(program: Program) {
    program.setHead(1);
  }
}
class Jump implements Operation {
  name = "jmp";

  execute(program: Program, arg: number) {
    program.setHead(arg);
  }
}
class Accumulate implements Operation {
  name = "acc";

  execute(program: Program, arg: number) {
    program.heap += arg;
    program.setHead(1);
  }
}

part1();
