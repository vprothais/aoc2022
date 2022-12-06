import run from "aocrunner";
import { pipe } from "rxjs";

const parseInput = (rawInput: string) => {
  const [stacksStr, movementsStr] = rawInput.split("\n\n");
  return { stacks: parseStacksAndRotate(stacksStr), movements: parseMovements(movementsStr) };
};

type Movement = {
  from: number;
  to: number;
  quantity: number;
};

type Pile = string[];

/**
 * Parse and rotate stack to have an array of crate pile
 * ex : [['A', 'B'], [], ['C']]
 */
const parseStacksAndRotate = (input: string): Pile[] => {
  return input
    .split("\n")
    .map((line) => line.match(/.{1,4}/g)?.map((crate) => crate.replace(/[^A-Z]/g, "")) || [])
    .reduce((stack: string[][], stackLine) => {
      stackLine.map((crate, index) => {
        if (crate !== "") {
          stack[index] = [...(stack[index] || []), crate];
        }
      });
      return stack;
    }, []);
};

const parseMovements = (input: string): Movement[] => {
  return input.split("\n").map((line) => {
    const moves = line.match(/[0-9]+/g)?.map((value) => parseInt(value)) || [];
    return { quantity: moves[0] || 0, from: (moves[1] || 1) - 1, to: (moves[2] || 1) - 1 };
  });
};

const crateMover9000Result = (array: any[]) => array.reverse();
const crateMover9001Result = (array: any[]) => array;

function getResultedStack(movements: Movement[], stacks: Pile[], crateResult: (arg: any[]) => any[]): Pile[] {
  return movements.reduce((stack, moves) => {
    stack[moves.to].unshift(...crateResult(stack[moves.from].splice(0, moves.quantity)));
    return stack;
  }, stacks);
}

const getTopCrates = (stack: Pile[]): string[] => {
  return stack.map((pile: Pile) => pile[0]);
};

const part1 = (rawInput: string) => {
  return pipe(
    parseInput,
    ({ stacks, movements }) => getResultedStack(movements, stacks, crateMover9000Result),
    getTopCrates,
    (crates) => crates.join(""),
  )(rawInput);
};

const part2 = (rawInput: string) => {
  return pipe(
    parseInput,
    ({ stacks, movements }) => getResultedStack(movements, stacks, crateMover9001Result),
    getTopCrates,
    (crates) => crates.join(""),
  )(rawInput);
};
const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
