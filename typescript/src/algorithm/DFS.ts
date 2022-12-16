import Stack from "../data-structure/Stack.ts";

export type Node<T> = {
  value: T;
  children: Node<T>[];
  visited: boolean;
};

export function DFS<T>(root: Node<T>, log = false) {
  const stack = new Stack<Node<T>>();
  stack.push(root);

  while (stack.isEmpty() === false) {
    const u = stack.pop();

    if (u?.visited === false) {
      u.visited = true;
      if (log) {
        console.log(u.value);
      }

      u.children.forEach((child) => {
        if (child.visited === false) {
          stack.push(child);
        }
      });
    }
  }
}
