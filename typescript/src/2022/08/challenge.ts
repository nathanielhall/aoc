// based on 2d array and NOT Graph
const direction = {
  UP: [-1, 0],
  DOWN: [1, 0],
  RIGHT: [0, 1],
  LEFT: [0, -1],
};

const step: (
  dir: "UP" | "DOWN" | "LEFT" | "RIGHT",
  point: [number, number],
) => [number, number] = (
  dir,
  [x, y],
) => {
  const [stepX, stepY] = direction[dir];
  return [x + stepX, y + stepY];
};

const walk: (
  graph: number[][],
  point: [number, number],
  elementToCompare: [number, number],
  dir: "UP" | "DOWN" | "LEFT" | "RIGHT",
  isVisible: boolean,
  numVisited: number,
) => [boolean, number] = (
  graph,
  point,
  elementToCompare,
  dir,
  isVisible,
  numVisited,
) => {
  const [x, y] = point;
  if ((x < 0 || x >= graph.length) || (y < 0 || y >= graph[0].length)) {
    return [isVisible, numVisited - 1];
  }
  // - Not Visible, return
  const [a, b] = elementToCompare;
  if (graph[x][y] >= graph[a][b]) {
    return [false, numVisited];
  }

  return walk(
    graph,
    step(dir, [x, y]),
    elementToCompare,
    dir,
    isVisible,
    numVisited + 1,
  );
};

const go = async () => {
  const text = await Deno.readTextFile("./input.txt");
  // const text = await Deno.readTextFile("./example.txt");
  const graph = text.split("\n").map((x) =>
    x.split("").map((y) => Number.parseInt(y))
  ).filter(Boolean);

  const visibleTrees = new Set<[number, number]>();
  const notVisibleTrees = new Set<[number, number]>();

  let highestScore = 0;

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      const status: Record<string, [boolean, number]> = Object.keys(direction)
        .reduce((acc, key) => {
          // Walk this direction until hitting going off grid,
          // or hitting a tree larger than current element
          const res = walk(
            graph,
            step(key, [i, j]),
            [i, j],
            key,
            true,
            1,
          );

          return ({
            ...acc,
            [key]: res,
          });
        }, {});

      const hasVisibility = Object.values(status).some(([isVisible]) =>
        isVisible
      );

      const score = Object.values(status).reduce((a, [, num]) => a * num, 1);

      if (score > highestScore) {
        console.log(`New Highest Score: ${i}:${j} is ${score}`);
        highestScore = score;
      }

      if (hasVisibility) {
        visibleTrees.add([i, j]);
      } else {
        notVisibleTrees.add([i, j]);
      }
    }
  }

  console.log("visibleTrees LEN", visibleTrees.size);
  console.log("Part 2 (highestScore): ", highestScore);
};

// -----------------------------------------------------------------
go();
