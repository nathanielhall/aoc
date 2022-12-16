// import Stack from "../data-structure/Stack.ts";
import Queue from "../data-structure/Queue.ts";

export type Node<T> = {
  value: T;
  children: Node<T>[];
  visited: boolean;
};

export function BFS<T>(root: Node<T>, log = false) {
  const q = new Queue<Node<T>>();
  q.enqueue(root);

  while (q.isEmpty() === false) {
    const u = q.dequeue();

    if (u?.visited === false) {
      u.visited = true;
      if (log) {
        console.log(u.value);
      }

      u.children.forEach((child) => {
        if (child.visited === false) {
          q.enqueue(child);
        }
      });
    }
  }
}
