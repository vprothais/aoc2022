import run from "aocrunner";

type Section = { start: number; end: number };

const parseInput = (rawInput: string): Section[][] =>
  rawInput.split("\n").map((inputLine) =>
    inputLine.split(",").map((section) => {
      const [start, end] = section.split("-").map((z) => parseInt(z));
      return { start, end };
    }),
  );

const part1 = (rawInput: string) => {
  return parseInput(rawInput).filter(
    ([section1, section2]) =>
      (section1.start >= section2.start && section1.end <= section2.end) ||
      (section1.start <= section2.start && section1.end >= section2.end),
  ).length;
};

const part2 = (rawInput: string) => {
  return parseInput(rawInput).filter(
    ([section1, section2]) =>
      (section1.start >= section2.start && section1.start <= section2.end) ||
      (section1.start <= section2.start && section1.end >= section2.start),
  ).length;
};

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
