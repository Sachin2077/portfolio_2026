// Design pixels as rem, for sizes set in JavaScript. The CSS gets the same conversion when the site builds,
// so both scale together on laptops (see globals.css).
export const rem = (px) => `${px / 16}rem`;
