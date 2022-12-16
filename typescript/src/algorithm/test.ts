// Test Graph
import { Node } from "./BFS.ts";
export const graph = () => {
  /*           88
	         /   \
		 33        99
		/  \     /   \
	  23    44  12   111

  */

  const x: Node<number> = {
    value: 88,
    children: [{
      value: 33,
      visited: false,
      children: [
        {
          value: 23,
          visited: false,
          children: [],
        },
        {
          value: 44,
          visited: false,
          children: [],
        },
      ],
    }, {
      value: 99,
      visited: false,
      children: [
        {
          value: 12,
          visited: false,
          children: [],
        },
        {
          value: 111,
          visited: false,
          children: [],
        },
      ],
    }],
    visited: false,
  };
  return x;
};
