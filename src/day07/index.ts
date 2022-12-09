import run from "aocrunner";

type Directory = {
  name: string;
  parent: string;
  children: string[];
  size: number;
};

const getNewDir = (name: string, parent: string = ""): Directory => ({
  parent,
  name,
  size: 0,
  children: [],
});

const parseInput = (rawInput: string) => {
  const input = rawInput
    .split("$")
    .map((line) => line.trim())
    .filter((line) => line.length);

  const filesystem = new Map<string, Directory>([["/", getNewDir("/")]]);

  let path: string[] = [];
  let currentDir = filesystem.get("/");
  input.forEach((commandLine) => {
    const [command, ...result] = commandLine.split("\n");
    if (command.startsWith("ls")) {
      result.forEach((file) => {
        if (file.startsWith("dir ")) {
          const dir = file.substring(4);
          const dirPath = path.join("/") + "/" + dir;
          currentDir!.children.push(dirPath);
          filesystem.set(dirPath, getNewDir(dir, currentDir!.name));
        } else {
          currentDir!.size += parseInt(file);
        }
      });
    } else {
      let destination = command.substring(3);
      if (destination === "..") {
        path.pop();
      } else {
        path.push(destination);
      }
      currentDir = filesystem.get(path.join("/"));
    }
  });
  computeDirSize("/", filesystem);
  return filesystem;
};

const computeDirSize = (node: string, filesystem: Map<string, Directory>): number => {
  const file = filesystem.get(node);
  if (file!.children.length === 0) {
    return file!.size;
  } else {
    return (file!.size += file!.children.reduce((acc, v) => acc + computeDirSize(v, filesystem), 0));
  }
};

const part1 = (rawInput: string) => {
  const filesystem = parseInput(rawInput);
  return [...filesystem.values()].filter((directory) => directory.size < 100_000).reduce((acc, v) => acc + v.size, 0);
};

const part2 = (rawInput: string) => {
  const filesystem = parseInput(rawInput);
  const diskSize = 70_000_000;
  const neededSpace = 30_000_000;
  const freeSpace = diskSize - filesystem.get("/")!.size;
  const spaceToFreeUp = neededSpace - freeSpace;

  return [...filesystem.values()]
    .filter((directory) => directory.size > spaceToFreeUp)
    .sort((a, b) => a.size - b.size)
    .shift()!.size;
};

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
