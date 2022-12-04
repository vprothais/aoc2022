import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getPriority = (char: string) => {
  const charCode = char.charCodeAt(0);
  return charCode > 96 ? charCode - 96 : charCode - 64 + 26;
};

const sum = (a: number, b: number): number => a + b;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  // @ts-ignore
  return input
    .map((backpackContent) => backpackContent.match(new RegExp(".{1," + backpackContent.length / 2 + "}", "g")))
    .map(([compartment1, compartment2]) => compartment1.match(new RegExp(`[${compartment2}]`))[0])
    .map(getPriority)
    .reduce(sum);
};

const part2 = (rawInput: string) => {
  return parseInput(rawInput)
    .match(/([a-zA-Z]+(\n|$)){1,3}/g)
    ?.map((group) => group.split("\n").filter((v) => v !== ""))
    .map(([elf1, elf2, elf3]) => {
      return elf1
        ?.match(new RegExp(`[${elf2}]`, "g"))
        ?.join("")
        .match(new RegExp(`[${elf3}]`, "g"))?.[0];
    })
    .map(getPriority)
    .reduce(sum);
};

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
