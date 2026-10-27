// Joins class names, skipping empty values.
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}
