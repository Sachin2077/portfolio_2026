import { fromRows } from '@/lib/pixels';

// Pixel sprites for the journey scene: clouds and sparkles, a platform under each card, the grass and
// flowers that grow on it, and a finish flag. Colours come from the brand palette.
export const sceneColors = {
  outline: '#3b6adb',
  white: '#ffffff',
  shade: '#d6e4ff',
  pink: '#ff8ca8',
  pinkDeep: '#e5668a',
  yellow: '#ffd166',
  mint: '#7ee7c8',
  green: '#3fae8c',
  greenDeep: '#2e8f73',
  purple: '#b9a6fb',
  blue: '#5793fb',
  pole: '#2b4fa8',
  ice: '#e3ecff',
  iceDeep: '#c8daff',
  underside: '#b3cbf8',
  sky: '#9cc0ff',
  amber: '#f4a259',
};

const C = sceneColors;

export const cloudLarge = fromRows(
  [
    '.........oooooo.........',
    '.......oowwwwwwoo.......',
    '......owwwwwwwwwwo......',
    '..oooowwwwwwwwwwwwooo...',
    '.owwwwwwwwwwwwwwwwwwwo..',
    'owwwwwwwwwwwwwwwwbbwwwo.',
    'owwwwwwwwwwwwbbbbbbbbwwo',
    'owwbbbbbbbbbbbbbbbbbbbwo',
    '.obbbbbbbbbbbbbbbbbbbbo.',
    '..oooooooooooooooooooo..',
  ],
  { o: C.outline, w: C.white, b: C.shade },
);

export const cloudSmall = fromRows(
  [
    '.....oooo.....',
    '...oowwwwoo...',
    '.oowwwwwwwwoo.',
    'owwwwwwwwbbwwo',
    'owwbbbbbbbbbwo',
    '.obbbbbbbbbbo.',
    '..oooooooooo..',
  ],
  { o: C.outline, w: C.white, b: C.shade },
);

// The four-point sparkle from the reference, hollow in the middle.
export const sparkle = (color) =>
  fromRows(['..x..', '..x..', 'xx.xx', '..x..', '..x..'], { x: color });

export const sparkleSmall = (color) => fromRows(['.x.', 'x.x', '.x.'], { x: color });

export const flag = fromRows(
  [
    '.dd...........',
    '.ddpppppppppp.',
    '.ddpwwppppppp.',
    '.ddpppppppp...',
    '.ddpppppppppp.',
    '.ddPPPPPPPPPP.',
    '.dd...........',
    '.dd...........',
    '.dd...........',
    '.dd...........',
    '.dd...........',
    '.dd...........',
    '.dd...........',
    '.dd...........',
    '.bddb.........',
    'bbbbbb........',
  ],
  { d: C.pole, p: C.pink, P: C.pinkDeep, w: C.white, b: C.outline },
);

// A repeatable 0–1 value per pixel, so textures look hand-placed but never change between renders.
function noise(x, y, seed) {
  let h = Math.imul(x + 1, 374761393) + Math.imul(y + 1, 668265263) + Math.imul(seed + 1, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const PLATFORM = {
  D: C.greenDeep,
  g: C.green,
  m: C.mint,
  o: C.outline,
  w: C.white,
  i: C.ice,
  b: C.shade,
  B: C.iceDeep,
  U: C.underside,
};

// The platform a journey card stands on, `width` pixels across. The top of row 0 is the surface the card's
// bottom edge rests on. A grass cap one pixel wider than the rock, a white-to-ice body lit from the top left,
// and an underside that narrows in four outlined steps, with a few roots below. `seed` varies the texture.
export function platform(width, seed = 0) {
  const last = width - 1;
  const n = (x, y) => noise(x, y, seed);
  const blank = () => Array(width).fill('.');
  const rows = [];

  // The grass cap: a dark top edge, a light band, a green band.
  rows.push(blank().map((_, x) => (x === 0 || x === last ? '.' : 'D')));
  rows.push(blank().map((_, x) => (x === 0 || x === last ? 'D' : n(x, 2) < 0.12 ? 'g' : 'm')));
  rows.push(blank().map((_, x) => (x === 0 || x === last ? 'D' : 'g')));

  // Moss drips over the cap's edge: single pixels, never two side by side.
  const drips = Array(width).fill(false);
  for (let x = 3; x < last - 2; x += 1) drips[x] = !drips[x - 1] && n(x, 3) < 0.16;

  // The body, one pixel in from the cap.
  for (let r = 0; r < 2; r += 1) {
    rows.push(
      blank().map((_, x) => {
        if (x === 0 || x === last) return '.';
        if (x === 1 || x === last - 1) return 'o';
        if (r === 0 && drips[x]) return 'g';
        if (x === 2) return 'w';
        if (x === last - 2) return r === 0 ? 'b' : 'B';
        return r === 0 ? 'w' : n(x, 6) < 0.06 ? 'b' : 'i';
      }),
    );
  }

  // The underside: each step is inset [left, right] pixels, a little more on the right so the platform
  // leans, darker as it goes down. The last step is the outline along the bottom.
  const steps = [
    [0.03, 0.035],
    [0.08, 0.1],
    [0.14, 0.17],
    [0.22, 0.26],
  ].map(([l, r]) => [Math.round(width * l), Math.round(width * r)]);
  steps.forEach((step, k) => {
    const [prevLeft, prevRight] = k === 0 ? [1, 1] : steps[k - 1];
    step[0] = Math.max(step[0], prevLeft + 1);
    step[1] = Math.max(step[1], prevRight + 1);
  });
  const fills = ['b', 'B', 'U'];
  const lighter = { b: 'i', B: 'b', U: 'B' };
  steps.forEach(([left, right], k) => {
    // Where the row above reaches past this one, its underside is a step edge: outline it.
    const [prevLeft, prevRight] = k === 0 ? [1, 1] : steps[k - 1];
    const above = rows[rows.length - 1];
    for (let x = prevLeft; x < left; x += 1) above[x] = 'o';
    for (let x = last - right + 1; x <= last - prevRight; x += 1) above[x] = 'o';
    const bottom = k === steps.length - 1;
    rows.push(
      blank().map((_, x) => {
        if (x < left || x > last - right) return '.';
        if (bottom || x === left || x === last - right) return 'o';
        if (x === left + 1) return lighter[fills[k]];
        return fills[k];
      }),
    );
  });

  // A few roots hang from the bottom, one or two pixels long.
  const [left, right] = steps[steps.length - 1];
  const roots = [blank(), blank()];
  for (let x = left + 2; x < last - right - 1; x += 1) {
    const v = n(x, 20);
    if (v < 0.07) {
      roots[0][x] = 'D';
      if (v < 0.03) roots[1][x] = 'm';
    }
  }
  rows.push(...roots);

  return fromRows(
    rows.map((cells) => cells.join('')),
    PLATFORM,
  );
}

// Two tones per petal colour, light on top and darker below, so small flowers still read on a pale page.
const PETALS = [
  ['#ff8ca8', '#e5668a'],
  ['#ffd166', '#efa63a'],
  ['#c9b8ff', '#9b85f2'],
  ['#9cc0ff', '#6f9bf2'],
  ['#ffb38a', '#ef8a5f'],
];

// Flower heads, top row first. `a` is the light petal, `b` the dark petal, `c` the centre.
const HEADS = {
  big: ['..a.a..', '.aaaaa.', 'aaacaaa', '.abbba.', '..b.b..'],
  bloom: ['.a.a.', 'aacaa', '.bbb.'],
  daisy: ['.a.', 'aca', '.b.'],
  tulip: ['a.a', 'aaa', '.b.'],
  bud: ['a', 'b'],
  sprout: ['m.m', '.g.'],
};

// What grows at a card's feet, oldest step first: one flower at the start, a full bed of flowers by the end.
// Each flower is [kind, height in pixels, column]: counted in from the platform's left end, or its right
// end on the `right` side. `middle` flowers sit along the card's base at a fraction of the width.
// On the left, a big bloom stands tall enough for its head to clear the dash in the card's corner, and
// anything further in stays four pixels short.
export const GARDENS = [
  { left: [['daisy', 4, 2]], right: [['sprout', 3, 3]] },
  { left: [['bloom', 5, 2]], right: [['daisy', 4, 2]] },
  { left: [['bloom', 6, 2]], right: [['bloom', 5, 3], ['sprout', 2, 7]] },
  { left: [['big', 10, 3]], right: [['tulip', 5, 2], ['daisy', 4, 6]] },
  { left: [['big', 10, 3]], right: [['big', 7, 3], ['bud', 4, 8], ['sprout', 3, 11]] },
  {
    left: [['big', 10, 3], ['bud', 4, 7]],
    right: [['big', 8, 3], ['bloom', 6, 8], ['daisy', 4, 12], ['sprout', 3, 15]],
    middle: [['daisy', 4, 0.55], ['bud', 3, 0.7]],
  },
]

// Grass tufts and flowers growing on a platform's top, drawn in front of the card that stands on it so the
// card looks planted. `width` matches the platform; the bottom row stands on its surface. Flowers stay in
// the card's bottom padding and its corners, below its text. `garden` is one of GARDENS.
export function blooms(width, seed = 0, garden = GARDENS[0]) {
  const height = 10;
  const base = height - 1;
  const grid = Array.from({ length: height }, () => Array(width).fill('.'));
  const palette = { g: C.green, m: C.mint, c: C.amber };
  const taken = new Set();
  const put = (x, y, c) => {
    if (x >= 0 && x < width && y >= 0 && y < height && grid[y][x] === '.') grid[y][x] = c;
  };

  // A flower `tall` pixels high, centred on column x: its head, a stem down to the grass, and leaves.
  let count = 0;
  const grow = (kind, tall, x) => {
    const [light, dark] = PETALS[(seed * 2 + count) % PETALS.length];
    const key = `p${count}`;
    count += 1;
    palette[`${key}a`] = light;
    palette[`${key}b`] = dark;
    const head = HEADS[kind];
    const top = base - tall + 1;
    const half = Math.floor(head[0].length / 2);
    head.forEach((row, r) =>
      [...row].forEach((cell, i) => {
        if (cell !== '.') put(x - half + i, top + r, cell === 'a' || cell === 'b' ? `${key}${cell}` : cell);
      }),
    );
    const stemTop = top + head.length;
    for (let y = stemTop; y <= base; y += 1) put(x, y, 'g');
    // A diagonal leaf on long stems, and a second one on the other side on the longest.
    const side = x % 2 ? 1 : -1;
    if (base - stemTop >= 2) {
      put(x + side, base - 1, 'g');
      put(x + side * 2, base - 2, 'm');
    }
    if (base - stemTop >= 4) {
      put(x - side, base - 3, 'g');
      put(x - side * 2, base - 4, 'm');
    }
    for (let dx = -half - 1; dx <= half + 1; dx += 1) taken.add(x + dx);
  };

  garden.left.forEach(([kind, tall, at]) => grow(kind, tall, at));
  garden.right.forEach(([kind, tall, at]) => grow(kind, tall, width - 1 - at));
  (garden.middle ?? []).forEach(([kind, tall, at]) => grow(kind, tall, Math.round(width * at)));

  // Small grass tufts every 11 to 16 pixels, where no flower grows.
  for (let x = 1 + (seed % 4); x < width - 2; x += 11 + Math.floor(noise(x, 30, seed) * 6)) {
    if (taken.has(x) || taken.has(x + 1) || taken.has(x + 2)) continue;
    put(x, base - 1, 'm');
    put(x + 2, base - 1, 'g');
    put(x + 1, base, 'g');
  }

  const names = Object.keys(palette);
  const symbol = new Map(names.map((name, i) => [name, String.fromCharCode(65 + i)]));
  return fromRows(
    grid.map((row) => row.map((cell) => (cell === '.' ? '.' : symbol.get(cell))).join('')),
    Object.fromEntries(names.map((name) => [symbol.get(name), palette[name]])),
  );
}
