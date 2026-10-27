// Pixel ornaments drawn in Figma as loose 1px–13px rectangles, kept as data so they stay crisp.
// Each entry is [x, y, width, height, fill].

// Turns rows of characters into pixel runs. '.' is empty; every other character maps to a colour
// in `palette`. Returns { pixels, width, height }, ready to spread into <PixelArt />.
export function fromRows(rows, palette) {
  const pixels = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const fill = palette[row[x]];
      if (!fill) {
        x += 1;
        continue;
      }
      let end = x + 1;
      while (end < row.length && row[end] === row[x]) end += 1;
      pixels.push([x, y, end - x, 1, fill]);
      x = end;
    }
  });
  return { pixels, width: Math.max(...rows.map((row) => row.length)), height: rows.length };
}

// The bracket corners around a journey card number: top-left and bottom-right, 5×5.
export const cornerTopLeft = [
  [0, 0, 1, 1, '#4790fb'],
  [0, 1, 1, 1, '#72a6f2'],
  [1, 2, 1, 1, '#b0d0ff'],
  [0, 3, 1, 1, '#b0d0ff'],
  [3, 0, 1, 1, '#b0d0ff'],
  [2, 1, 1, 1, '#b0d0ff'],
  [1, 1, 1, 1, '#2174ee'],
  [0, 2, 1, 1, '#2174ee'],
  [1, 3, 1, 1, '#2174ee'],
  [0, 4, 1, 1, '#2174ee'],
  [2, 2, 1, 1, '#2174ee'],
  [2, 0, 1, 1, '#2174ee'],
  [3, 1, 1, 1, '#2174ee'],
  [4, 0, 1, 1, '#2174ee'],
  [1, 0, 1, 1, '#72a6f1'],
];

export const cornerBottomRight = [
  [4, 4, 1, 1, '#0a61e0'],
  [4, 3, 1, 1, '#72a6f2'],
  [3, 2, 1, 1, '#b0d0ff'],
  [4, 1, 1, 1, '#b0d0ff'],
  [1, 4, 1, 1, '#b0d0ff'],
  [2, 3, 1, 1, '#b0d0ff'],
  [3, 3, 1, 1, '#2174ee'],
  [4, 2, 1, 1, '#2174ee'],
  [3, 1, 1, 1, '#2174ee'],
  [4, 0, 1, 1, '#2174ee'],
  [2, 2, 1, 1, '#2174ee'],
  [2, 4, 1, 1, '#2174ee'],
  [1, 3, 1, 1, '#2174ee'],
  [0, 4, 1, 1, '#2174ee'],
  [3, 4, 1, 1, '#96bef8'],
];

// The 48×3 dashed bar at the foot of each journey card.
export const journeyDash = [
  ['#89b0fc', 0],
  ['#5183fd', 3],
  ['#4790fb', 6],
  ['#1171ff', 9],
  ['#0549ac', 12],
  ['#4790fb', 15],
  ['#1a72f3', 18],
  ['#89b0fc', 21],
  ['#5183fd', 24],
  ['#4790fb', 27],
  ['#1171ff', 30],
  ['#0549ac', 33],
  ['#4790fb', 36],
  ['#5183fd', 39],
  ['#89b0fc', 42],
  ['#5082fd', 45],
].map(([fill, x]) => [x, 0, 3, 3, fill]);

// Two overlapping squares above a belief number (17×18).
export const beliefMark = [
  [0, 0, 13, 12, '#5793fb'],
  [5, 6, 12, 12, '#bad3ff'],
];

// The stepped cluster in the bottom-right corner of a belief card (39×36).
export const beliefCluster = [
  [0, 24, 13, 12, '#bad3ff'],
  [13, 12, 13, 12, '#bad3ff'],
  [26, 0, 13, 12, '#bad3ff'],
  [26, 24, 13, 12, '#bad3ff'],
];

// The "next" arrow beside "What I believe" (96×40, 8px pixels).
export const nextArrow = [
  [0, 0, 8, 8, '#b4d1ff'],
  [8, 0, 8, 8, '#5793fb'],
  [16, 0, 8, 8, '#b4d1ff'],
  [24, 0, 8, 8, '#5793fb'],
  [32, 0, 8, 8, '#b4d1ff'],
  [40, 8, 8, 8, '#5793fb'],
  [48, 16, 8, 8, '#b4d1ff'],
  [56, 16, 8, 8, '#5793fb'],
  [64, 16, 8, 8, '#b4d1ff'],
  [72, 16, 8, 8, '#5793fb'],
  [80, 16, 8, 8, '#b4d0ff'],
  [88, 16, 8, 8, '#5793fb'],
  [80, 8, 8, 8, '#5793fb'],
  [80, 24, 8, 8, '#5793fb'],
  [72, 0, 8, 8, '#5793fb'],
  [72, 32, 8, 8, '#5793fb'],
];
