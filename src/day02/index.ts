import run from "aocrunner";

const parseInput = (rawInput: string): string[][] => rawInput.split("\n").map((v) => v.split(" "));

// A : Rock
// B : Paper
// C : Scissors

const part1 = (rawInput: string) => {
  const responses = new Map([
    ["X", { points: 1, name: "rock", beats: "C", equals: "A" }],
    ["Y", { points: 2, name: "paper", beats: "A", equals: "B" }],
    ["Z", { points: 3, name: "scissors", beats: "B", equals: "C" }],
  ]);

  return parseInput(rawInput)
    .map(([opponentPlay, myPlay]) => {
      const myAction = responses.get(myPlay);
      return myAction!.points + (myAction!.beats === opponentPlay ? 6 : myAction!.equals === opponentPlay ? 3 : 0);
    })
    .reduce((a, v) => a + v, 0);
};

const part2 = (rawInput: string) => {
  // X : loose
  // Y : draw
  // Z : win
  const actions = new Map([
    ["A", { name: "rock", X: 3, Y: 4, Z: 8 }],
    ["B", { name: "paper", X: 1, Y: 5, Z: 9 }],
    ["C", { name: "scissors", X: 2, Y: 6, Z: 7 }],
  ]);
  return parseInput(rawInput)
    .map(([opponentPlay, turnResult]) => {
      if (actions.has(opponentPlay)) {
        const action = actions.get(opponentPlay);
        // @ts-ignore
        return action[turnResult];
      }
    })
    .reduce((a, v) => a + v, 0);
};

const testInput = `A Y
B X
C Z`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
