export const lines = (x: string) => {
  return x.split(/\r?\n/);
};

type Fn = (str: string) => void;
export const readLines = (data: string) => {
  const l = data.split(/\r?\n/);
  return (
    {
      extract: (excludeBlankLines = true) =>
        excludeBlankLines ? l.filter(Boolean) : l,
      map: (fn: Fn) => l.map(fn),
    }
  );
};

/**
 * Perform breadth first search on a key/value data structure
 * @param items
 * @returns
 */
export const breadthFirstSearch: (
  items: Record<string, string>,
  initial: string,
) => string[] = (
  items,
  initial,
) => {
  const queue: string[] = [initial];
  const visited: string[] = [];

  while (queue?.length) {
    const current = queue.pop();

    Object.entries(items).forEach(
      ([k, v]) => {
        if (visited.includes(k)) return;

        if (v.includes(current || "")) {
          queue.push(k);
          visited.push(k);
        }
      },
    );
  }

  return visited;
};
