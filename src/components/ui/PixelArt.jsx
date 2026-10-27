import { rem } from '@/lib/rem';

// Draws a list of [x, y, width, height, fill] rectangles as a crisp inline SVG.
// `width` and `height` are the art's own grid size; `scale` resizes it on screen, in design pixels that
// scale with the page. The journey measures its pixel size on screen, so it passes `unit="px"`.
export default function PixelArt({ pixels, width, height, scale = 1, unit = 'rem', className, title }) {
  return (
    <svg
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={unit === 'px' ? undefined : { width: rem(width * scale), height: rem(height * scale) }}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {pixels.map(([x, y, w, h, fill], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </svg>
  );
}
