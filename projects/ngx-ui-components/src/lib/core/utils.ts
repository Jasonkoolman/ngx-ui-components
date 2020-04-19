/**
 * Construct a string of class names.
 */
export function classNames(...names: any[]): string {
  return names.filter(Boolean).join(' ');
}
