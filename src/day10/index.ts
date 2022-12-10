import run from "aocrunner";
import { sum } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput.split("\n");

function getCyclesXValue(commands: string[]) {
  let cycle = 0;
  let x = 1;
  return commands.reduce((result: number[], commandLine: string): number[] => {
    let [command, param] = commandLine.split(" ");
    if (command === "addx") {
      result.push(x, x);
      x += parseInt(param);
      cycle++;
    } else {
      result.push(x);
    }
    cycle++;
    return result;
  }, []);
}

const part1 = (rawInput: string) => {
  const commands = parseInput(rawInput);
  const cyclesToWatch = [20, 60, 100, 140, 180, 220];
  return getCyclesXValue(commands)
    .filter((_, i) => cyclesToWatch.includes(i + 1))
    .map((x, cycle) => x * cyclesToWatch[cycle])
    .reduce(sum);
};

const part2 = (rawInput: string) => {
  const commands = parseInput(rawInput);
  const CRTWidth = 40;
  return getCyclesXValue(commands)
    .map((x, cycle) => {
      const crtPos = cycle % CRTWidth;
      return crtPos >= x - 1 && crtPos <= x + 1 ? "#" : ".";
    })
    .reduce((output, pixel, index) => output + pixel + ((index + 1) % CRTWidth === 0 ? "\n" : ""), "");
};

const testInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected:
          "##..##..##..##..##..##..##..##..##..##..\n" +
          "###...###...###...###...###...###...###.\n" +
          "####....####....####....####....####....\n" +
          "#####.....#####.....#####.....#####.....\n" +
          "######......######......######......####\n" +
          "#######.......#######.......#######.....\n",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
