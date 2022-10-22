import { readdirSync } from 'fs';

// Uses fs to check if a certain file extension exists in a folder.
// Returns a string[] of path to the files
export function findFiles(path: string): (extension: string) => string[] {
  return (extension: string): string[] => {
    const files: string[] = readdirSync(path);

    return files.filter(
      (str: string): boolean => str.slice(-4) == '.' + extension
    );
  }
}
