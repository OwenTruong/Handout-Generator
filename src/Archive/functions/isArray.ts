export function isArray<T>(obj: unknown): obj is Array<T> {
  return typeof obj === 'object' && obj !== null && 'length' in obj;
}
