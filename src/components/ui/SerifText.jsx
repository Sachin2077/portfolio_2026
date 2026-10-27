// Ponomar has no good "&" or "?", so Figma swaps those two glyphs to Poly. This does the same.
export default function SerifText({ children }) {
  if (typeof children !== 'string') return children;

  return children.split(/([&?])/).map((part, i) =>
    part === '&' || part === '?' ? (
      <span key={i} className="font-poly">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
