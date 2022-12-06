import run from "aocrunner";

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
  return (
    input
      .split("\n")
      .map((line) => line.match(/.{1,4}/g)?.map((crate) => crate.replace(/[^A-Z]/g, "")) || [])
      .reduce((stack: string[][], stackLine) => {
        stackLine.map((crate, index) => {
          if (crate) {
            if (!stack[index]) {
              stack[index] = [];
            }
            stack[index].push(crate);
          }
        });
        return stack;
      }, []) || [[]]
  );
};

const parseMovements = (input: string): Movement[] => {
  return input.split("\n").map((v) => {
    const moves = v.match(/[0-9]+/g)?.map((x, i) => parseInt(x) - (i ? 1 : 0));
    return { quantity: moves?.[0] || 0, from: moves?.[1] || 0, to: moves?.[2] || 0 };
  });
};

const part1 = (rawInput: string) => {
  const { stacks, movements } = parseInput(rawInput);
  return movements
    .reduce((stack, moves) => {
      stack[moves.to].unshift(...stack[moves.from].splice(0, moves.quantity).reverse());
      return stack;
    }, stacks)
    .reduce((result, pile) => result + (pile[0] || ""), "");
};

const part2 = (rawInput: string) => {
  const { stacks, movements } = parseInput(rawInput);
  return movements
    .reduce((stack, moves) => {
      stack[moves.to].unshift(...stack[moves.from].splice(0, moves.quantity));
      return stack;
    }, stacks)
    .reduce((a, v) => a + (v[0] || ""), "");
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
