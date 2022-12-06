const getMarker = async (packetSize = 4) => {
  const text = await Deno.readTextFile("./input.txt");
  const input = text.split("");

  let marker = 0;
  for (let start = 0; start < input.length; start++) {
    const window = input.slice(start, start + packetSize);
    const hasDuplicate = [...new Set(window)].length !== window.length;
    if (!hasDuplicate) {
      marker = start + (packetSize - 1);
      break;
    }
  }
  return marker + 1;
};

// -----------------------------------------------------------------
console.log("Part 1", await getMarker(4)); // start of packet marker
console.log("Part 2", await getMarker(14)); // start of message marker
