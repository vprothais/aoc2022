import run from "aocrunner";

const parseInput = (rawInput: string): string[] => rawInput.split("");

const getIndexOfMarker = (signal: string[], markerSize: number): number => {
  return signal.reduce((acc, value, i, a) => {
    if (i >= markerSize - 1 && acc === 0) {
      const set = new Set(a.slice(i - markerSize + 1, i + 1));
      return set.size === markerSize ? i + 1 : 0;
    }
    return acc;
  }, 0);
};

const part1 = (rawInput: string) => {
  return getIndexOfMarker(parseInput(rawInput), 4);
};

const part2 = (rawInput: string) => {
  return getIndexOfMarker(parseInput(rawInput), 14);
};

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
