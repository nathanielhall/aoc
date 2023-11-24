const getMarker = async (packetSize = 4) => {
  const text = await Deno.readTextFile("./input.txt");
  const input = text.split("");

  const markerIndex = input.findIndex((_, i) => {
    const window = input.slice(i, i + packetSize);
    return [...new Set(window)].length === window.length;
  });

  return markerIndex + packetSize;
};

// -----------------------------------------------------------------
console.log("Part 1", await getMarker(4)); // start of packet marker
console.log("Part 2", await getMarker(14)); // start of message marker
