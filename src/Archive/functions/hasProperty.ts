export function hasProperty(obj: unknown) {
  return (prop: string) =>
    typeof obj === 'object' && obj !== null && prop in obj;
}
