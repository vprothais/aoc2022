import run from "aocrunner";

function getCaloriesByElf(input: string): number[] {
  return input
    .split("\n\n")
    .map((elfCalories) => elfCalories.split("\n").map((calories) => parseInt(calories)))
    .map((calories: number[]) => calories.reduce((a, v) => a + v, 0));
}

const part1 = (rawInput: string) => {
  return Math.max(...getCaloriesByElf(rawInput));
};

const part2 = (rawInput: string) => {
  return getCaloriesByElf(rawInput)
    .sort((a, b) => b - a)
    .filter((_, i) => i < 3)
    .reduce((a, v) => a + v, 0);
};

const puzzleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

run({
  part1: {
    tests: [
      {
        input: puzzleInput,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: puzzleInput,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
