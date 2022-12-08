import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split("").map((tree) => parseInt(tree)));

const part1 = (rawInput: string) => {
  const forest = parseInput(rawInput);
  const forestHeight = forest.length;
  const forestWidth = forest[0].length;

  return forest
    .map((line, y) =>
      line.map((tree, x) => {
        let canBeSeenFromTop = true;
        let canBeSeenFromBottom = true;
        let canBeSeenFromRight = true;
        let canBeSeenFromLeft = true;
        for (let i = y - 1; i >= 0 && canBeSeenFromTop; i--) {
          canBeSeenFromTop = canBeSeenFromTop && forest[i][x] < tree;
        }
        for (let i = y + 1; i < forestHeight && canBeSeenFromRight; i++) {
          canBeSeenFromBottom = canBeSeenFromBottom && forest[i][x] < tree;
        }
        for (let i = x + 1; i < forestWidth && canBeSeenFromRight; i++) {
          canBeSeenFromRight = canBeSeenFromRight && forest[y][i] < tree;
        }
        for (let i = x - 1; i >= 0 && canBeSeenFromLeft; i--) {
          canBeSeenFromLeft = canBeSeenFromLeft && forest[y][i] < tree;
        }
        return canBeSeenFromTop || canBeSeenFromBottom || canBeSeenFromRight || canBeSeenFromLeft ? tree : -Infinity;
      }),
    )
    .reduce((acc, v) => acc + v.filter((x) => x >= 0).length, 0);
};

const part2 = (rawInput: string) => {
  const forest = parseInput(rawInput);
  const forestHeight = forest.length;
  const forestWidth = forest[0].length;
  const views: number[][] = [];

  forest.forEach((line, y) => {
    views.push([...Array(forestWidth)].map(() => 0));
    line.forEach((tree, x) => {
      let viewTop = 0;
      let viewBottom = 0;
      let viewRight = 0;
      let viewLeft = 0;
      for (let i = y - 1; i >= 0; i--) {
        viewTop++;
        if (forest[i][x] >= tree) {
          break;
        }
      }
      for (let i = y + 1; i < forestHeight; i++) {
        viewBottom++;
        if (forest[i][x] >= tree) {
          break;
        }
      }
      for (let i = x + 1; i < forestWidth; i++) {
        viewRight++;
        if (forest[y][i] >= tree) {
          break;
        }
      }
      for (let i = x - 1; i >= 0; i--) {
        viewLeft++;
        if (forest[y][i] >= tree) {
          break;
        }
      }
      views[y][x] = viewTop * viewBottom * viewRight * viewLeft;
    });
  });

  return views.reduce((maxView, value) => {
    const maxOfLine = Math.max(...value);
    return maxView < maxOfLine ? maxOfLine : maxView;
  }, 0);
};

const testInput = `30373
25512
65332
33549
35390`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
