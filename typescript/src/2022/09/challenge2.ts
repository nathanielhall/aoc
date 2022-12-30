const range = <T>(length: number) => Array.from<T>({ length });

interface Node<T> {
  value: T;
  previous?: Node<T>;
  next?: Node<T>;
}

const createNode = <T>(value: T): Node<T> => ({
  value,
});

const createLinkedList = <T>(length: number, item: T) => {
  const head = createNode(item);

  return range<T>(length).reduce(([head, node]) => {
    node.next = createNode(item);
    node.next.previous = node;
    return [head, node.next];
  }, [head, head])[0];
};

const walkLinkedList = <T>(
  head: Node<T>,
  fn: (next: Node<T>) => T | undefined,
) => {
  const res: (T | undefined)[] = [];
  let node: Node<T> | undefined = head;

  while (node) {
    res.push(fn(node));
    node = node.next;
  }

  return res;
};

type Point2D = [number, number];

const getVelocity = (direction: string): Point2D => {
  switch (direction) {
    case "R":
      return [1, 0];
    case "L":
      return [-1, 0];
    case "U":
      return [0, -1];
    case "D":
      return [0, 1];
  }

  return [0, 0];
};

const move = (pos: Point2D, velocity: Point2D): Point2D =>
  pos.map((a, i) => a + velocity[i]) as Point2D;

const sub = (x: Point2D, y: Point2D): Point2D =>
  x.map((a, i) => a - y[i]) as Point2D;

const clamp = (p: Point2D): Point2D =>
  p.map((a) => Math.max(Math.min(a, 1), -1)) as Point2D;

const getEuclidianDistance = (a: Point2D, b: Point2D) => {
  const displacement = b.map((p, i) => p - a[i]);
  return Math.floor(Math.sqrt(displacement.reduce((dis, p) => dis + p * p, 0)));
};

export const getTailVisitCount = (input: string, length = 2) => {
  const rope = createLinkedList<Point2D>(length - 1, [0, 0]);
  const visitedTailPositions = new Set<string>();

  const path = input.split("\n")
    .filter(Boolean) // trims file line ending
    .map((move) => move.split(" "));

  //   path.forEach(([dir, num]) => {
  //     range<Node<Point2D> | undefined>(Number.parseInt(num)).forEach((x, i) =>
  //       console.log("x", i)
  //     );
  //   });

  const pathTailPositions = path.flatMap(([direction, steps]) =>
    range<Node<Point2D> | undefined>(Number.parseInt(steps)).flatMap(() =>
      walkLinkedList(rope, (node) => {
        if (!node.previous) {
          node.value = move(node.value, getVelocity(direction));
          return;
        }

        if (getEuclidianDistance(node.previous.value, node.value) > 1) {
          const nodeDir = clamp(sub(node.previous.value, node.value));
          node.value = move(node.value, nodeDir);
        }

        if (!node.next) { // return new tail visited position
          return node.value;
        }
      })
    )
  );

  //   const test = new Set(pathTailPositions.filter(Boolean));
  //   console.log("test.size", test.size);

  //   console.log("pathTailPositions", pathTailPositions.filter(Boolean).length);

  const t = pathTailPositions.filter(Boolean).length;
  console.log("t", t);

  pathTailPositions
    .filter(Boolean)
    .map(([x, y] = [0, 0]) => `${x}-${y}`)
    .forEach((hash) => visitedTailPositions.add(hash));

  return visitedTailPositions.size;
};

const text = await Deno.readTextFile("./input.txt");
const x = getTailVisitCount(text, 10);
console.log("x", x);
