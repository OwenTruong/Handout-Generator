export function throwError(...lines: string[]): void {
  throw new Error(lines.join('\n'));
}