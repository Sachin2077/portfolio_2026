const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    // Turns every px in the CSS into rem, so the whole layout scales with the root font size (globals.css).
    // Zero stays 0px, because a bare 0 isn't valid inside calc() or clamp().
    'postcss-pxtorem': { propList: ['*'], minPixelValue: 0.01 },
  },
};

export default config;
