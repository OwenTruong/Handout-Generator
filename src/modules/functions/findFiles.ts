import { readdirSync } from 'fs';

export function findFiles(path: string): (format: string) => string[] {
  return (format: string): string[] => {
    const files: string[] = readdirSync(path);

    return files.filter(
      (str: string): boolean => str.slice(-4) == '.' + format
    );
  }
}
